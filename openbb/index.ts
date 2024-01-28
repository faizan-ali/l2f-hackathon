require('dotenv').config()

import fetch from 'node-fetch'
import { addDays, isSameDay, subDays } from 'date-fns'
import { Portfolio } from '../app/api/portfolio/route'
import { getSummary, openai } from '../lib/openai'


const request = async (path: string): Promise<any> => {
  return await fetch(`https://mindsdb2024.openbb.dev/api/v1${path}`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Basic b3BlbmJiOm1pbmRzZGIyMDI0`
    }
  }).then(_ => _.json())
}

export const getCurrentPrice = async (symbol: string): Promise<number> => {
  const { results } = await request(`/equity/price/quote?provider=intrinio&symbol=${symbol}&source=intrinio_mx`)
  return results[0].last_price
}

export const getHistoricalPrices = async (ticker: string): Promise<Array<{
  date: string,
  value: number,
  swing: boolean,
  swingPercentage: number,
  isSwingIncrease: boolean,
  actualChange: number
}>> => {
  const { results } = await request(`/equity/price/historical?provider=intrinio&symbol=${ticker}&interval=1d&timezone=UTC&source=realtime&start_date=2023-11-01`)
  const prices = results.reverse().map(_ => ({ date: _.date, value: _.close })).map((result, index) => {
    if (index === 0) {
      return result
    }

    const previous = results[index - 1]

    const change = result.value - previous.close
    const percentageChange = (change / previous.close) * 100
    const isSwingIncrease = change > 0
    const swing = Math.abs(percentageChange) > 3

    return { ...result, swing, swingPercentage: percentageChange, ...(swing && { isSwingIncrease }), actualChange: change }
  })

  return prices
}

export const getArticles = async (ticker: string, date: string): Promise<Array<string>> => {
  const intrinResults = await request(`/news/company?provider=intrinio&symbols=${ticker}&display=headline&sort=created&order=desc&limit=5000`).then(_ => _.results)
  const fnpResults = await request(`/news/company?provider=fmp&symbols=${ticker}&display=headline&sort=created&order=desc&limit=5000`).then(_ => _.results)

  const results = [...intrinResults, ...fnpResults].filter(result => {
    if (ticker === 'GOOG') {
      return result.symbols === 'GOOG' || result.symbols === 'GOOG,GOOGL' || result.symbols === 'GOOGL,GOOG'
    }
    return result.symbols === ticker
  }).filter(result => {
      return isSameDay(new Date(result.date), new Date(date)) ||
        isSameDay(subDays(new Date(result.date), 3), new Date(date)) ||
        isSameDay(addDays(new Date(result.date), 3), new Date(date))
    }
  ).map(_ => _.url)

  console.log(`Found ${results.length} articles for ${ticker} on ${date}`)
  return results.slice(0, 2)
}

const test = async () => {
  const tickers = Portfolio.map(_ => _.ticker)

  const allPricesWithArticles: Array<{
    ticker: string
    swing: boolean,
    articles: string[]
    isSwingIncrease?: boolean,
    date: string,
    value: number,
    summary?: string
    swingPercentage: number
  }> = []

  for (const ticker of tickers) {
    const prices = await getHistoricalPrices(ticker)
    allPricesWithArticles.push(...(await Promise.all(prices.map(async price => {
      if (price.swing) {

        const articles = await getArticles(ticker, price.date)

        const summary = (await Promise.all(articles.map(async article => {
          const summary = getSummary(ticker, price.isSwingIncrease, article)
          return summary
        }))).join('\n')


        return {
          ...price,
          articles,
          ticker,
          summary,
        }
      }

      return { ...price, ticker, articles: [] }
    }))))
  }

  const valuesByDate: Record<string, {
    values: number[],
    swing: boolean,
    articles: string[],
    isSwingIncrease?: boolean,
    swingTickers: string[],
    summaries: string[]
  }> = {}

  allPricesWithArticles.forEach(price => {
    if (!valuesByDate[price.date]) {
      valuesByDate[price.date] = {
        values: [],
        swing: false,
        articles: [],
        swingTickers: [],
        summaries: []
      }
    }

    valuesByDate[price.date].values.push(price.value)
    price.swing = price.swing || valuesByDate[price.date].swing
    valuesByDate[price.date].articles.push(...price.articles)
    price.swing && valuesByDate[price.date].swingTickers.push(price.ticker)
    price.isSwingIncrease = price.isSwingIncrease === undefined ? valuesByDate[price.date].isSwingIncrease : price.isSwingIncrease
    price.summary && valuesByDate[price.date].summaries.push(price.summary)
  })

  const averageByDate: Record<string, {
    value: number,
    swing: boolean,
    articles: string[],
    swingTickers: string[],
    isSwingIncrease?: boolean,
    summaries: string[]
  }> = {
    ...Object.keys(valuesByDate).reduce((acc, date) => {
      acc[date] = {
        value: valuesByDate[date].values.reduce((a, b) => a + b, 0) / valuesByDate[date].values.length,
        swing: valuesByDate[date].swing,
        articles: valuesByDate[date].articles,
        swingTickers: valuesByDate[date].swingTickers,
        isSwingIncrease: valuesByDate[date].isSwingIncrease,
        summaries: valuesByDate[date].summaries
      }

      return acc
    }, {})
  }

  const array = Object.keys(averageByDate).map(date => {
    return { date, ...averageByDate[date] }
  })
  //
  // for (const elt of array) {
  //   await mongo.insertOne(elt)
  // }

  console.log(array)
}

const test2 = async () => {
  console.log(await getHistoricalPrices('TSLA'))
}

test()

const promptTest = async () => {
  const response = openai.chatCompletion(`You are a seasoned Wall Street analyst who is an expert in linking news cycle events to stock price swings.

Given the article below, explain why the stock GOOG has decreased.

Your response MUST be a single paragraph.  I will tip extra for simple, easy to understand language.`, `Is Alphabet Stock a Buy? | The Motley Fool

Search
Accessibility
Log In

Help

Join The Motley Fool

Accessibility Menu




Free Article
Join Over Half a Million Premium Members And Get More In-Depth Stock Guidance and Research

By Justin Pope
–
Jan 15, 2024 at 8:44AM

Key Points
Alphabet relies on selling ads.
This year could be huge for the advertising industry.
How Alphabet's reasonable valuation and high floor make shares worth owning.

Motley Fool Issues Rare “All In” Buy Alert


NASDAQ: GOOGL
Alphabet
Market Cap
$1,905B
Today's Change
Arrow-Thin-Down
(0.21%) $0.32
Current Price
$152.19

Price as of January 26, 2024, 4:00 p.m. ET


You’re reading a free article with opinions that may differ from The Motley Fool’s Premium Investing Services. Become a Motley Fool member today to get instant access to our top analyst recommendations, in-depth research, investing resources, and more. Learn More
Alphabet could be the perfect stock to capitalize on increased viewership of the 2024 election and Olympic Games.
Investors in internet giant Alphabet (GOOGL 0.21%) went for a fun ride in 2023. Share prices soared by 58% last year, a tremendous feat for a company worth over a trillion dollars.
Are you considering buying this "Magnificent Seven" stock today? It might feel silly after such a run. But don't be too quick to move on to something else. Alphabet could benefit from solid catalysts in its core business, and the financials paint an interesting picture of the stock's valuation.
Is Alphabet stock a buy? The answers lie below.
2024 is shaping up to be a strong year for the ad business
Alphabet is a lot of things. It sells cloud products, dabbles in artificial intelligence (AI), and creates software that people use worldwide. But at the end of the day, it's an advertising business. Its key websites, Google and YouTube, are routinely the top two most heavily trafficked sites in the world by a wide margin. It creates a massive audience, and selling ads is very lucrative.
Of the company's $76.6 billion in total revenue in Q3, $59.6 billion, or 78%, came from ads. Despite intense discussion around AI and Alphabet's other projects, the business goes where its advertising business goes. The good news is Alphabet could be poised for an excellent year. According to a report by Forbes, industry-wide ad spending stabilized over the back half of 2023 and should accelerate in 2024.
NASDAQ: GOOGL Alphabet Today's Change (0.21%) $0.32 Current Price $152.19 Arrow-Thin-Down
GOOGL
Key Data Points Market Cap $1,905B Day's Range $151.01 - $152.53 52wk Range $88.58 - $153.05 Volume 26,115,494 Avg Vol 27,419,866 Gross Margin 55.93% Dividend Yield N/A
Several high-profile events (some unfortunate, some good) are already taking place, and more are expected to happen over the next 12 months. People seek information on geopolitical tensions and war in Ukraine and the Middle East. Meanwhile, there is a presidential election happening in America this year, and the 2024 Olympic Games are taking place this summer in Paris. Alphabet's pole position in search and video will likely translate to a boost in ads.
Is the stock expensive? Looking at the data
Most stocks aren't cheap after rising over 50% in a year. However, Alphabet could be an exception. While 2023 was an exciting rally, most probably forgot the stock's run began when shares were already down 45% from their high.
You can see that the stock's rise did push its valuation higher. Alphabet's price-to-earnings ratio (P/E) was once in the mid-teens, a bargain for one of Wall Street's most powerful corporations. You often hear how the broader market can be irrational -- well, this is a prime example. Today, at over 21 times estimated earnings, Wall Street has come to its senses a bit.
GOOGL PE Ratio (Forward) data by YCharts
But even at this higher valuation, calling Alphabet expensive could be a stretch. Analysts believe the company could grow earnings by an average of nearly 18% annually over the long term. Using the PEG ratio, Alphabet's ratio of 1.2 is very reasonable, assuming the company achieves that growth.
Should investors buy Alphabet stock?
The risk to investors is that Alphabet falls short, and the market punishes the stock, ruining your investment returns. How likely is that? Alphabet is one of the world's best businesses when it comes to generating cash flow. Roughly $0.29 of every revenue dollar ends up as free cash flow. And because Alphabet is such a large company, that has added up to over $77 billion over the past year alone.
Management is using its cash flow to gobble up the company's stock, repurchasing shares to help boost its earnings growth. That creates a floor that should help the company keep earnings growth going, reducing the chances the stock falls on its face. Alphabet has reduced its outstanding shares by 10% over the past five years.
Ultimately, Alphabet is a stock you can justify buying whenever the valuation is reasonable or better. Given the potential ad business strength in 2024, solid valuation, and ongoing share repurchases, investors can confidently buy the stock today.
Suzanne Frey, an executive at Alphabet, is a member of The Motley Fool's board of directors. Justin Pope has no position in any of the stocks mentioned. The Motley Fool has positions in and recommends Alphabet. The Motley Fool has a disclosure policy.


Related Articles
3 Reasons to Buy Alphabet Stock in 2024
My Top 3 Growth Stocks in 2024
3 AI Stocks to Help You Retire a Millionaire: 2024 Edition
2 Tech Stocks You Can Buy and Hold for the Next Decade
Can Alphabet Stock Hit $200 in 2024?

590%




Premium Investing Services
Invest better with The Motley Fool. Get stock recommendations, portfolio guidance, and more from The Motley Fool's premium services.
View Premium Services
Current


This website uses cookies to deliver our services and to analyze traffic. We also share information about your use of our site with advertising and other partners.Privacy Policy`, 'gpt-4')
  console.log(await response)
}


import fetch from 'node-fetch'
import { addDays, isSameDay, subDays } from 'date-fns'
import { Portfolio } from '../app/api/portfolio/route'

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
  swingPercentage: number
}>> => {
  const { results } = await request(`/equity/price/historical?provider=intrinio&symbol=${ticker}&interval=1d&timezone=UTC&source=realtime&start_date=2023-12-01`)
  const prices = results.reverse().map(_ => ({ date: _.date, value: _.close })).map((result, index) => {
    if (index === 0) {
      return result
    }

    const previous = results[index - 1]

    const change = result.value - previous.close
    const percentageChange = (change / previous.close) * 100

    return { ...result, swing: percentageChange > 4, swingPercentage: percentageChange }
  })

  return prices
}

export const getArticles = async (ticker: string, date: string): Promise<Array<string>> => {
  const intrinResults = await request(`/news/company?provider=intrinio&symbols=${ticker}&display=headline&sort=created&order=desc&limit=500`).then(_ => _.results)
  const fnpResults = await request(`/news/company?provider=fmp&symbols=${ticker}&display=headline&sort=created&order=desc&limit=500`).then(_ => _.results)

  return [...intrinResults, ...fnpResults].filter(result => {
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
    .slice(0, 3)
}

const test = async () => {
  const tickers = Portfolio.map(_ => _.ticker)
  const allPricesWithArticles: Array<{
    ticker: string
    swing: boolean,
    articles: string[],
    date: string,
    value: number,
    swingPercentage: number
  }> = []

  for (const ticker of tickers) {
    const prices = await getHistoricalPrices(ticker)
    allPricesWithArticles.push(...(await Promise.all(prices.map(async price => {
      if (price.swing) {
        const articles = await getArticles(ticker, price.date)
        return { ...price, articles, ticker }
      }

      return { ...price, articles: [], ticker }
    }))))
  }

  const valuesByDate: Record<string, {values: number[], swing: boolean, articles: string[], swingTickers: string[]}> = {}

  allPricesWithArticles.forEach(price => {
    if (!valuesByDate[price.date]) {
      valuesByDate[price.date] = { values: [], swing: false, articles: [], swingTickers: [] }
    }

    valuesByDate[price.date].values.push(price.value)
    valuesByDate[price.date].swing = valuesByDate[price.date].swing || price.swing
    valuesByDate[price.date].articles.push(...price.articles)
    valuesByDate[price.date].swing && valuesByDate[price.date].swingTickers.push(price.ticker)
  })

  const averageByDate: Record<string, {value: number, swing: boolean, articles: string[], swingTickers: string[]}> = {
    ...Object.keys(valuesByDate).reduce((acc, date) => {
      acc[date] = {
        value: valuesByDate[date].values.reduce((a, b) => a + b, 0) / valuesByDate[date].values.length,
        swing: valuesByDate[date].swing,
        articles: valuesByDate[date].articles,
        swingTickers: valuesByDate[date].swingTickers
      }

      return acc
    }, {})
  }

  const array = Object.keys(averageByDate).map(date => {
    return { date, ...averageByDate[date] }
  })

  console.log(array)
}

test()
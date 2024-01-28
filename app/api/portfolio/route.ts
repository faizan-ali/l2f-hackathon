import { NextResponse } from 'next/server'
import { getArticles, getHistoricalPrices } from '../../../openbb'

export const Portfolio = [
  {
    ticker: 'GOOG',
    allocation: '23'
  },
  {
    ticker: 'AAPL',
    allocation: '20'
  },
  {
    ticker: 'MSFT',
    allocation: '17'
  },
  {
    ticker: 'NVDA',
    allocation: '10'
  },
  {
    ticker: 'TSLA',
    allocation: '15'
  },
  {
    ticker: 'AMZN',
    allocation: '15'
  },
  {
    ticker: 'MA',
    allocation: '23'
  }
]

export const GET = async (req: Request) => {
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

  const valuesByDate: Record<string, {
    values: number[],
    swing: boolean,
    articles: string[],
    swingTickers: string[]
  }> = {}

  allPricesWithArticles.forEach(price => {
    if (!valuesByDate[price.date]) {
      valuesByDate[price.date] = { values: [], swing: false, articles: [], swingTickers: [] }
    }

    valuesByDate[price.date].values.push(price.value)
    valuesByDate[price.date].swing = valuesByDate[price.date].swing || price.swing
    valuesByDate[price.date].articles.push(...price.articles)
    valuesByDate[price.date].swing && valuesByDate[price.date].swingTickers.push(price.ticker)
  })

  const averageByDate: Record<string, { value: number, swing: boolean, articles: string[], swingTickers: string[] }> = {
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

  return NextResponse.json([
    {
      date: '2023-12-01',
      value: 280.9914285714285,
      swing: undefined,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-04',
      value: 276.1357142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-05',
      value: 279.75428571428574,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-06',
      value: 277.40714285714284,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-07',
      value: 281.75714285714287,
      swing: true,
      articles: [
        'https://seekingalpha.com/article/4656965-investors-take-note-alphabet-stock-is-still-a-buy',
        'https://www.fool.com/investing/2023/12/09/3-top-artificial-intelligence-stocks-to-buy-right/',
        'https://www.youtube.com/watch?v=pz_gc6ZpJf4'
      ],
      swingTickers: [
        'GOOG', 'AAPL',
        'MSFT', 'NVDA',
        'TSLA', 'AMZN',
        'MA'
      ],
      isSwingIncrease: true,
      summaries: [
        'The stock price of Alphabet Inc., the parent company of Google (GOOG), has increased due to several positive factors highlighted in the news article. Firstly, the company reported strong quarterly earnings that exceeded market expectations, demonstrating robust financial health and profitability. Secondly, Alphabet\'s ongoing investments in cloud computing and artificial intelligence are expected to drive future growth, which is appealing to investors. Lastly, the company\'s announcement of a stock buyback program has also contributed to the stock price increase. This is because stock buybacks reduce the number of shares in circulation, which can increase the earnings per share and subsequently boost the stock price.',
        'The stock price of Google (GOOG) has increased due to recent news highlighting the company\'s advancements in the field of artificial intelligence (AI). The article from The Motley Fool identifies Google as one of the top AI stocks to buy right now, which has likely sparked increased investor interest. Google\'s AI technology is being recognized for its potential to revolutionize various industries, from healthcare to automotive, which suggests promising growth prospects for the company. This positive outlook on Google\'s AI capabilities has likely led to a surge in buying activity for its stock, driving up the price.',
        'As an AI, I\'m unable to watch or analyze video content. Please provide a text-based news article or a summary of the video content for me to provide an analysis.'
      ]
    },
    {
      date: '2023-12-08',
      value: 283.58000000000004,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-11',
      value: 280.96999999999997,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-12',
      value: 283.5057142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-13',
      value: 285.7128571428571,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-14',
      value: 285.3957142857143,
      swing: true,
      articles: [],
      swingTickers: ['TSLA', 'AMZN', 'MA'],
      isSwingIncrease: true,
      summaries: []
    },
    {
      date: '2023-12-15',
      value: 287.5828571428571,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-18',
      value: 291.01142857142855,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-19',
      value: 291.54571428571427,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-20',
      value: 286.41857142857145,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-21',
      value: 290.24285714285713,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-22',
      value: 289.89428571428573,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-26',
      value: 291.00142857142856,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-27',
      value: 291.71000000000004,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-28',
      value: 291.1771428571429,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-29',
      value: 290.2357142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-02',
      value: 285.4271428571429,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-03',
      value: 282.37,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-04',
      value: 281.4485714285714,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-05',
      value: 282.77714285714285,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-08',
      value: 290.69142857142856,
      swing: true,
      articles: [
        'https://finance.yahoo.com/video/fpt-chairman-overseas-expansion-plans-054414284.html?.tsrc=rss',
        'https://finance.yahoo.com/news/vietnam-fpt-sees-overseas-sales-031130809.html?.tsrc=rss',
        'https://techcrunch.com/2024/01/10/ces-2024-everything-you-need-to-know/?.tsrc=rss'
      ],
      swingTickers: ['NVDA', 'TSLA', 'AMZN', 'MA'],
      isSwingIncrease: true,
      summaries: [
        'The stock NVDA has increased due to the announcement by FPT Corporation, a global leading technology service company, about its plans for overseas expansion. This expansion is expected to increase the demand for NVDA\'s products, as FPT Corporation is a significant customer. The news has led investors to anticipate higher future earnings for NVDA, which has resulted in an increase in the stock\'s price. In simple terms, when a big customer like FPT Corporation plans to grow its business, it\'s likely they will buy more from their suppliers like NVDA, which can mean more money for NVDA in the future. This potential for more money makes NVDA\'s stock more attractive to investors, causing the price to go up.',
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to the news that Vietnam\'s largest listed company, FPT Corp, is planning to shift its focus to digital transformation and invest heavily in this area. This is significant for Nvidia because FPT Corp is a major client of theirs, and this shift in focus will likely result in increased demand for Nvidia\'s products and services. Nvidia specializes in creating various hardware and software tools that are essential for digital transformation, such as AI applications, data processing units, and more. Therefore, the increased investment and focus on digital transformation by FPT Corp is expected to directly benefit Nvidia, leading to increased sales and revenue, which in turn has led to the rise in Nvidia\'s stock price.',
        'The stock price of NVDA, or Nvidia Corporation, has increased due to the positive news and announcements made at the Consumer Electronics Show (CES) 2024. The company unveiled its latest technological advancements and products, which were well-received by the market. These innovations demonstrate Nvidia\'s continued leadership and growth potential in the tech industry, particularly in areas like artificial intelligence, gaming, and data centers. This positive news has boosted investor confidence in the company\'s future performance, leading to increased demand for its stock and, consequently, a rise in its stock price.'
      ]
    },
    {
      date: '2024-01-09',
      value: 291.97428571428566,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-10',
      value: 296.0285714285714,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-11',
      value: 295.89000000000004,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-12',
      value: 295.47714285714284,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-16',
      value: 297.6028571428572,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-17',
      value: 295.75,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-18',
      value: 299.2371428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-19',
      value: 305.3457142857143,
      swing: true,
      articles: [
        'https://finance.yahoo.com/news/nvidia-ceo-makes-first-china-022348791.html?.tsrc=rss',
        'https://www.fool.com/investing/2024/01/21/history-says-nasdaq-to-gain-2-ai-stocks-to-buy/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
        'https://finance.yahoo.com/news/30-best-investors-twitter-social-171430248.html?.tsrc=rss'
      ],
      swingTickers: ['NVDA', 'TSLA', 'AMZN', 'MA'],
      isSwingIncrease: true,
      summaries: [
        'The stock price of NVDA (Nvidia Corporation) has increased due to the recent announcement by the company\'s CEO, Jensen Huang, about his first visit to China since the pandemic began. During his visit, he is expected to discuss Nvidia\'s plans to acquire Arm Ltd., a UK-based semiconductor and software design company. This acquisition is significant as it could potentially boost Nvidia\'s capabilities in the technology and semiconductor sector, thereby increasing its market share and profitability. Investors are reacting positively to this news, leading to an increase in the company\'s stock price.',
        'The stock NVDA has increased due to the announcement of NVIDIA\'s new artificial intelligence (AI) technology. This news has sparked investor interest as AI technology is a rapidly growing sector with high potential for future profits. NVIDIA is already a well-established player in the tech industry, and this new development further solidifies its position. The company\'s commitment to innovation and growth in AI technology signals to investors that it is well-positioned to capitalize on this trend, leading to increased confidence in the stock\'s future performance. This increased investor confidence has resulted in a higher demand for the stock, driving up its price.',
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to its mention in a Yahoo Finance article as one of the top 30 stocks being discussed by influential investors on Twitter. This kind of publicity can generate interest and drive up demand for a stock, leading to an increase in its price. Additionally, the article\'s focus on Nvidia\'s role in the tech industry, particularly in areas like artificial intelligence and gaming, highlights the company\'s potential for growth and innovation, which can also contribute to a rise in stock price.'
      ]
    },
    {
      date: '2024-01-22',
      value: 305.42571428571426,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-23',
      value: 306.4871428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-24',
      value: 309.2042857142857,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-25',
      value: 306.5757142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-26',
      value: 305.9071428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    }
  ])
}
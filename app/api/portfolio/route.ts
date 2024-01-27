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

const hardCoded = {
  '2023-12-01': {
    value: 280.9914285714285,
    swing: undefined,
    articles: [],
    swingTickers: []
  },
  '2023-12-04': {
    value: 276.1357142857143,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-05': {
    value: 279.75428571428574,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-06': {
    value: 277.40714285714284,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-07': {
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
    ]
  },
  '2023-12-08': {
    value: 283.58000000000004,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-11': {
    value: 280.96999999999997,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-12': {
    value: 283.5057142857143,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-13': {
    value: 285.7128571428571,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-14': {
    value: 285.3957142857143,
    swing: true,
    articles: [],
    swingTickers: ['TSLA', 'AMZN', 'MA']
  },
  '2023-12-15': {
    value: 287.5828571428571,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-18': {
    value: 291.01142857142855,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-19': {
    value: 291.54571428571427,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-20': {
    value: 286.41857142857145,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-21': {
    value: 290.24285714285713,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-22': {
    value: 289.89428571428573,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-26': {
    value: 291.00142857142856,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-27': {
    value: 291.71000000000004,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-28': {
    value: 291.1771428571429,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2023-12-29': {
    value: 290.2357142857143,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-02': {
    value: 285.4271428571429,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-03': { value: 282.37, swing: false, articles: [], swingTickers: [] },
  '2024-01-04': {
    value: 281.4485714285714,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-05': {
    value: 282.77714285714285,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-08': {
    value: 290.69142857142856,
    swing: true,
    articles: [
      'https://finance.yahoo.com/video/fpt-chairman-overseas-expansion-plans-054414284.html?.tsrc=rss',
      'https://finance.yahoo.com/news/vietnam-fpt-sees-overseas-sales-031130809.html?.tsrc=rss',
      'https://techcrunch.com/2024/01/10/ces-2024-everything-you-need-to-know/?.tsrc=rss'
    ],
    swingTickers: ['NVDA', 'TSLA', 'AMZN', 'MA']
  },
  '2024-01-09': {
    value: 291.97428571428566,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-10': {
    value: 296.0285714285714,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-11': {
    value: 295.89000000000004,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-12': {
    value: 295.47714285714284,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-16': {
    value: 297.6028571428572,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-17': { value: 295.75, swing: false, articles: [], swingTickers: [] },
  '2024-01-18': {
    value: 299.2371428571428,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-19': {
    value: 305.3457142857143,
    swing: true,
    articles: [
      'https://finance.yahoo.com/news/nvidia-ceo-makes-first-china-022348791.html?.tsrc=rss',
      'https://www.fool.com/investing/2024/01/21/history-says-nasdaq-to-gain-2-ai-stocks-to-buy/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
      'https://finance.yahoo.com/news/30-best-investors-twitter-social-171430248.html?.tsrc=rss'
    ],
    swingTickers: ['NVDA', 'TSLA', 'AMZN', 'MA']
  },
  '2024-01-22': {
    value: 305.42571428571426,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-23': {
    value: 306.4871428571428,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-24': {
    value: 309.2042857142857,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-25': {
    value: 306.5757142857143,
    swing: false,
    articles: [],
    swingTickers: []
  },
  '2024-01-26': {
    value: 305.9071428571428,
    swing: false,
    articles: [],
    swingTickers: []
  }
}
  export const GET = async (req: Request) => {
  // const tickers = Portfolio.map(_ => _.ticker)
  // const allPricesWithArticles: Array<{
  //   ticker: string
  //   swing: boolean,
  //   articles: string[],
  //   date: string,
  //   value: number,
  //   swingPercentage: number
  // }> = []
  //
  // for (const ticker of tickers) {
  //   const prices = await getHistoricalPrices(ticker)
  //   allPricesWithArticles.push(...(await Promise.all(prices.map(async price => {
  //     if (price.swing) {
  //       const articles = await getArticles(ticker, price.date)
  //       return { ...price, articles, ticker }
  //     }
  //
  //     return { ...price, articles: [], ticker }
  //   }))))
  // }
  //
  // const valuesByDate: Record<string, {
  //   values: number[],
  //   swing: boolean,
  //   articles: string[],
  //   swingTickers: string[]
  // }> = {}
  //
  // allPricesWithArticles.forEach(price => {
  //   if (!valuesByDate[price.date]) {
  //     valuesByDate[price.date] = { values: [], swing: false, articles: [], swingTickers: [] }
  //   }
  //
  //   valuesByDate[price.date].values.push(price.value)
  //   valuesByDate[price.date].swing = valuesByDate[price.date].swing || price.swing
  //   valuesByDate[price.date].articles.push(...price.articles)
  //   valuesByDate[price.date].swing && valuesByDate[price.date].swingTickers.push(price.ticker)
  // })
  //
  // const averageByDate: Record<string, { value: number, swing: boolean, articles: string[], swingTickers: string[] }> = {
  //   ...Object.keys(valuesByDate).reduce((acc, date) => {
  //     acc[date] = {
  //       value: valuesByDate[date].values.reduce((a, b) => a + b, 0) / valuesByDate[date].values.length,
  //       swing: valuesByDate[date].swing,
  //       articles: valuesByDate[date].articles,
  //       swingTickers: valuesByDate[date].swingTickers
  //     }
  //
  //     return acc
  //   }, {})
  // }

  return NextResponse.json(hardCoded)
}
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

export const getHistoricalPrices = async (ticker: string): Promise<Array<{ date: string, value: number }>> => {
  const { results } = await request(`/equity/price/historical?provider=intrinio&symbol=${ticker}&interval=1d&timezone=UTC&source=realtime`)
  return results.map(_ => ({ date: _.date, value: _.close }))
}

export const getArticles = async (ticker: string, date: string): Promise<Array<string>> => {
  const response = await request(`/news/company?provider=benzinga&symbols=${ticker}&display=headline&start_date=2023-01-12&sort=created&order=desc&limit=100&date=${date}`)

  return response.results.filter(result => {
    if (ticker === 'GOOG') {
      return result.symbols === 'GOOG' || result.symbols === 'GOOG,GOOGL' || result.symbols === 'GOOGL,GOOG'
    }
    return result.symbols === ticker
  }).filter(result =>
    isSameDay(new Date(result.date), new Date(date)) ||
    isSameDay(subDays(new Date(result.date), 1), new Date(date)) ||
    isSameDay(addDays(new Date(result.date), 1), new Date(date))
  )
}

const test = async () => {
  // console.log(await getHistoricalPrices('GOOG'))
  // console.log(await getArticles('GOOG', '2023-01-12'))
  const tickers = Portfolio.map(_ => _.ticker)
  console.log(JSON.stringify(await getHistoricalPrices('GOOG'), null, 2))
}

test()
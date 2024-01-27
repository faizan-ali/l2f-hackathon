import fetch from 'node-fetch'

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

export const getHistoricalPrices = async (ticker: string): Promise<Array<number>> => {
  const { results } = await request(`/equity/price/historical?provider=intrinio&symbol=${ticker}&interval=1d&timezone=UTC&source=realtime`)
  return results.map(_ => _)
}

export const getArticles= async (ticker: string): Promise<Array<string>> => {

}

const test = async () => {
  console.log(await getHistoricalPrices('INX'))
}

test()
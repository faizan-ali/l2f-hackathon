import { NextResponse } from 'next/server'
import { getArticles, getHistoricalPrices } from '../../../openbb'

export const Portfolio = [
  {
    ticker: 'AMD',
    allocation: '23'
  },
  {
    ticker: 'AMAT',
    allocation: '20'
  },
  {
    ticker: 'ADBE',
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
      date: '2023-11-01',
      value: 275.9371428571429,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-02',
      value: 282.7685714285714,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/24d7c452-c9e5-38c6-962b-8a95a17a64fa/elon-musk%3A-%E2%80%98none-of-my.html?.tsrc=rss',
        'https://finance.yahoo.com/m/2fa1d673-c916-36a7-88f5-ae5a0a3d0374/why-chargepoint%2C-nikola%2C-and.html?.tsrc=rss'
      ],
      swingTickers: ['TSLA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of Tesla (TSLA) has increased due to recent comments made by the company\'s CEO, Elon Musk, stating that none of his companies would be going bankrupt. This statement has reassured investors about the financial stability of Tesla, leading to increased confidence in the company\'s future prospects. This renewed confidence has resulted in more people buying Tesla\'s stock, driving up its price. Furthermore, Musk\'s reputation as a successful entrepreneur also adds credibility to his statement, further boosting investor sentiment.\n' +
        'The stock TSLA has increased due to the announcement of President Joe Biden\'s $2 trillion infrastructure plan, which includes a $174 billion budget to boost the electric vehicle market. This plan aims to build a network of 500,000 EV charging stations by 2030, replace diesel vehicles used by federal agencies with electric ones, and offer tax incentives to people who buy electric vehicles. As Tesla is a leading player in the electric vehicle industry, this substantial government support is expected to significantly increase the demand for Tesla\'s products, leading to a rise in its stock price.'
      ]
    },
    {
      date: '2023-11-03',
      value: 287.18857142857144,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/224b1ae8-0f43-3b27-b809-a0d16853eef7/qualcomm-signals-it%27s.html?.tsrc=rss',
        'https://finance.yahoo.com/news/12-best-large-cap-stocks-120831198.html?.tsrc=rss',
        'https://finance.yahoo.com/m/24d85844-6553-31dc-88c8-21ba4ebd74de/dow-jones-futures-loom-after.html?.tsrc=rss',
        'https://finance.yahoo.com/m/24d85844-6553-31dc-88c8-21ba4ebd74de/dow-jones-futures%3A-what-to-do.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'NVDA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD (Advanced Micro Devices) has increased due to the announcement that Qualcomm, a major player in the semiconductor industry, is struggling with supply constraints and is unable to meet the demand for its chips. This situation presents an opportunity for AMD, as it can potentially fill the gap left by Qualcomm\'s inability to supply enough chips. Investors are likely buying more AMD shares in anticipation of increased sales and revenue, which is driving up the stock price.\n' +
        `The stock price of AMD (Advanced Micro Devices) has increased due to its inclusion in the list of "12 Best Large Cap Stocks To Buy According To Ray Dalio". Ray Dalio, a highly respected hedge fund manager and founder of Bridgewater Associates, is known for his successful investment strategies. When a stock is recommended by such a prominent figure, it often leads to increased investor confidence and demand for that stock, which in turn drives up its price. In this case, Dalio's endorsement of AMD as a good buy has likely contributed to its recent price increase.`,
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to the company\'s announcement of a 4-for-1 stock split. This move is generally seen as a positive signal by investors, as it often indicates that the company\'s share price has grown significantly. The stock split makes the shares more affordable for average investors, potentially increasing demand and driving up the stock price. Additionally, Nvidia\'s strong performance in the technology sector, particularly in areas like artificial intelligence and gaming, contributes to investor confidence in the company\'s future growth potential.\n' +
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to the company\'s announcement of a 4-for-1 stock split. This move is generally seen as a way to make the company\'s shares more affordable for average investors, which can increase demand and drive up the stock price. Additionally, Nvidia\'s strong performance in the technology sector, particularly in areas like artificial intelligence and gaming, has boosted investor confidence in the company\'s future growth potential, further contributing to the rise in its stock price.'
      ]
    },
    {
      date: '2023-11-06',
      value: 288.6057142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-07',
      value: 293.3857142857143,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/vishay-vsh-q3-earnings-beat-171400853.html?.tsrc=rss',
        'https://finance.yahoo.com/news/adobe-systems-adbe-laps-stock-224518882.html?.tsrc=rss'
      ],
      swingTickers: ['ADBE'],
      isSwingIncrease: undefined,
      summaries: [
        'The article does not provide information on Adobe Inc. (ADBE) or any event related to it that could have caused an increase in its stock price. The article is about Vishay Intertechnology\'s Q3 earnings, which exceeded expectations. Therefore, based on the information given in this article, it\'s not possible to explain why the stock ADBE has increased.\n' +
        'The stock price of Adobe Systems (ADBE) has increased due to the company\'s strong third-quarter fiscal 2021 results. The company reported impressive earnings and revenue figures, surpassing Wall Street\'s expectations. This positive financial performance is primarily driven by the robust demand for Adobe\'s creative products, digital media solutions, and document cloud services. The company\'s successful digital transformation strategy and its ability to capitalize on the growing demand for cloud-based solutions during the pandemic have also contributed to its strong financial performance. This has boosted investor confidence in the company\'s growth prospects, leading to an increase in its stock price.'
      ]
    },
    {
      date: '2023-11-08',
      value: 294.67999999999995,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-09',
      value: 291.77714285714285,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-10',
      value: 300.3471428571429,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/07f827e0-f0a1-3155-841b-a718b9d66bd2/amd-has-a-new-hit-ai-chip-on.html?.tsrc=rss',
        'https://finance.yahoo.com/m/4f2c665f-d41f-330b-9feb-bf7c252a7172/2-under-the-radar-gaming.html?.tsrc=rss',
        'https://finance.yahoo.com/news/applied-materials-amat-expected-beat-150015510.html?.tsrc=rss',
        'https://finance.yahoo.com/news/now-time-look-buying-applied-120020319.html?.tsrc=rss',
        'https://finance.yahoo.com/news/vishay-vsh-q3-earnings-beat-171400853.html?.tsrc=rss',
        'https://finance.yahoo.com/news/adobe-systems-adbe-laps-stock-224518882.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'AMAT', 'ADBE'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD (Advanced Micro Devices) has increased due to the announcement of their new AI (Artificial Intelligence) chip, which is expected to be a big hit in the market. This new chip, designed for data centers, is set to compete with similar products from Intel and Nvidia, and is expected to boost AMD\'s market share in this sector. The news of this product launch has created a positive sentiment among investors, who anticipate that the new chip will significantly increase AMD\'s revenues and profitability, leading to a rise in the company\'s stock price.\n' +
        'The stock price of AMD has increased due to the company\'s strong position in the gaming industry, as highlighted in the article. AMD\'s chips are used in both Sony\'s PlayStation 5 and Microsoft\'s Xbox Series X, two of the most popular gaming consoles. With the ongoing global chip shortage, the demand for AMD\'s products has surged, leading to increased sales and profits. Furthermore, the company\'s recent announcement of a new chip specifically designed for Tesla\'s infotainment system has also boosted investor confidence in AMD\'s innovative capabilities and future growth prospects. This combination of high demand and positive future outlook has resulted in a rise in AMD\'s stock price.',
        'The stock price of Applied Materials (AMAT) has increased due to the anticipation of a positive earnings report. The article suggests that AMAT is expected to beat earnings estimates in its upcoming report, which has led to increased investor confidence. This is because beating earnings estimates typically indicates that a company is performing better than expected, which can lead to an increase in stock price. Additionally, the company\'s earnings have been showing an upward trend recently, which further boosts investor optimism about the company\'s financial performance.\n' +
        'The stock price of Applied Materials (AMAT) has increased due to a positive outlook on the company\'s performance. The article suggests that now is a good time to buy AMAT shares, indicating a strong market sentiment towards the company. This is largely due to the company\'s strong financial health and its position as a leading player in the semiconductor industry, which is currently experiencing a global boom. Furthermore, the company\'s recent earnings report exceeded expectations, demonstrating its ability to generate profits and growth. This positive news has likely led to increased investor confidence, resulting in a rise in the stock\'s price.',
        'The article provided does not contain information related to Adobe Inc. (ADBE) or any news that could directly impact its stock price. Therefore, based on this article, it\'s not possible to explain why the stock ADBE has increased. Please provide the correct article or information related to Adobe Inc. for a proper analysis.\n' +
        'The stock price of Adobe Systems (ADBE) has increased due to the company\'s strong financial performance in the recent quarter, as reported in the article. Adobe\'s revenues and earnings per share exceeded Wall Street\'s expectations, which is a positive signal to investors about the company\'s profitability and growth potential. Additionally, the company\'s subscription services, particularly its Creative Cloud and Document Cloud, have seen robust growth, indicating a steady stream of recurring revenue. This strong financial performance and promising growth prospects have boosted investor confidence, leading to an increase in demand for the stock and consequently, a rise in its price.'
      ]
    },
    {
      date: '2023-11-13',
      value: 300.5314285714286,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/nvidia-stock-nasdaq-nvda-striving-041602455.html?.tsrc=rss',
        'https://finance.yahoo.com/m/f5e75dcc-b158-3742-852e-f99bdbbb55af/tesla-and-other-evs-are.html?.tsrc=rss'
      ],
      swingTickers: ['TSLA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock TSLA has increased due to the announcement of a partnership between Tesla and Nvidia, a leading tech company known for its graphics processing units. This collaboration is aimed at developing a new artificial intelligence (AI) system for self-driving cars. Investors are optimistic about this partnership as Nvidia\'s advanced technology combined with Tesla\'s pioneering position in the electric vehicle market could lead to significant advancements in autonomous driving technology. This optimism is reflected in the increased demand for TSLA shares, leading to a rise in its stock price.\n' +
        'The stock price of Tesla (TSLA) has increased due to the news of the Biden administration\'s plan to replace the U.S. government\'s fleet of cars and trucks with electric vehicles (EVs). This announcement has sparked optimism among investors as it indicates a strong governmental support for the EV industry, which Tesla is a leading player in. The plan would not only increase the demand for EVs, but also potentially lead to more favorable policies and incentives for EV manufacturers like Tesla, thus boosting its business prospects and investor confidence, leading to a rise in its stock price.'
      ]
    },
    {
      date: '2023-11-14',
      value: 307.9585714285714,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/168b7aea-e4f8-3298-bb6d-102a5c7259ec/dow-jones-futures%3A-s%26p-500.html?.tsrc=rss',
        'https://finance.yahoo.com/m/8dbbba0b-017b-3ee1-b5f1-ea358dd07141/hyundai-to-be-first-automaker.html?.tsrc=rss'
      ],
      swingTickers: ['TSLA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock TSLA (Tesla Inc.) has increased due to the announcement of a new, more affordable model of electric vehicle, the Model 2, which is expected to boost the company\'s sales significantly. This news has generated positive sentiment among investors who believe that the introduction of a lower-priced model will make Tesla\'s products more accessible to a wider range of consumers, thereby increasing the company\'s market share and profitability. Furthermore, the company\'s decision to accept Bitcoin as a form of payment has also contributed to the stock\'s rise, as it reflects Tesla\'s innovative approach and its ability to adapt to new market trends.\n' +
        'The stock price of Tesla (TSLA) has increased due to the news that Hyundai is planning to introduce a hydrogen fuel cell system in its electric vehicles. This news is significant because it validates the electric vehicle market and the technology behind it, which Tesla is a leader in. When a major automaker like Hyundai makes a move towards electric vehicles, it signals to investors that the demand for electric vehicles is growing and that Tesla, being a pioneer and market leader in this sector, stands to benefit greatly from this trend. This increased confidence in the future prospects of Tesla leads to an increase in its stock price.'
      ]
    },
    {
      date: '2023-11-15',
      value: 305.7757142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-16',
      value: 306.43142857142857,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-17',
      value: 306.3757142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-20',
      value: 311.0028571428571,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-21',
      value: 310.41285714285715,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-22',
      value: 310.0171428571429,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-24',
      value: 309.2185714285714,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-27',
      value: 309.70428571428573,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-28',
      value: 310.6228571428572,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/futures-mostly-higher-tesla-reveals-051344810.html?.tsrc=rss',
        'https://www.cnn.com/2023/11/30/business/tesla-delivers-first-cybertruck-into-a-tougher-new-world?cid=external-feeds_iluminar_yahoo&.tsrc=rss'
      ],
      swingTickers: ['TSLA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of Tesla Inc. (TSLA) has increased due to the company\'s recent announcement of a new, more affordable electric vehicle model. This news has excited investors as it indicates a potential expansion of Tesla\'s market share. The new model is expected to attract a broader customer base who were previously unable to afford Tesla\'s higher-end models. This could lead to increased sales and revenue for the company, thus boosting its stock price. Additionally, the announcement also signals Tesla\'s continued innovation and commitment to making electric vehicles more accessible, which further strengthens investor confidence in the company\'s future growth.\n' +
        'The stock price of Tesla (TSLA) has increased due to the news of the company delivering its first Cybertruck. This event is significant as it marks the transition of the Cybertruck from concept to reality, demonstrating Tesla\'s ability to follow through on its promises. The delivery of the first Cybertruck also indicates that Tesla is expanding its product line, which could potentially lead to increased sales and revenue. Furthermore, the successful launch of the Cybertruck into a challenging market environment shows Tesla\'s resilience and adaptability, factors that are likely to boost investor confidence in the company.'
      ]
    },
    {
      date: '2023-11-29',
      value: 310.32571428571424,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-11-30',
      value: 307.09285714285716,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-01',
      value: 307.6171428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-04',
      value: 302.16428571428565,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-05',
      value: 303.81428571428575,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-06',
      value: 300.93142857142857,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-07',
      value: 307.73857142857145,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/bbcc210e-3e10-308f-a129-6a1b70ff4584/nvidia-is-not-the-only.html?.tsrc=rss',
        'https://finance.yahoo.com/news/amd-ceo-debuts-nvidia-chip-182428413.html?.tsrc=rss'
      ],
      swingTickers: ['AMD'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD has increased due to the announcement of their new product, the Radeon RX 6700 XT graphics card. This product is expected to compete directly with Nvidia\'s RTX 3000 series, which is currently facing supply shortages. The market perceives this as an opportunity for AMD to gain market share in the graphics card industry. Additionally, the overall demand for graphics cards has surged due to the rise of cryptocurrency mining and gaming during the pandemic, which further boosts the potential sales of AMD\'s new product. This positive outlook has led to an increase in AMD\'s stock price.\n' +
        'The stock price of AMD has increased due to the announcement made by the company\'s CEO about the debut of a new chip that rivals Nvidia\'s data center chips. This new product is expected to enhance AMD\'s competitive position in the market, which is dominated by Nvidia. The news has sparked optimism among investors about the company\'s future growth prospects, leading to increased demand for its shares. This surge in demand is what has driven the stock price up.'
      ]
    },
    {
      date: '2023-12-08',
      value: 309.30428571428575,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-11',
      value: 311.7657142857143,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/advanced-micro-devices-amd-increases-224513470.html?.tsrc=rss',
        'https://finance.yahoo.com/m/6aba9d3b-8f80-3ac6-94f3-9d186b2587d0/intel-to-launch-processors.html?.tsrc=rss',
        'https://finance.yahoo.com/m/86fafc2c-10d4-3ec4-a775-2cc644ffeefa/china-chip-gear-buying-could.html?.tsrc=rss',
        'https://finance.yahoo.com/news/applied-materials-receives-sbti-validation-133000081.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'AMAT'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of Advanced Micro Devices (AMD) has increased due to the announcement of a new partnership with Samsung. This collaboration will allow Samsung to use AMD\'s graphics technology in its smartphones, which is a significant expansion of AMD\'s market presence. The deal is expected to bring in substantial revenue for AMD, and investors are reacting positively to this news. This partnership not only signifies a new income stream for AMD, but also a strong vote of confidence in its technology from a major player in the global tech industry, hence the rise in AMD\'s stock price.\n' +
        'The stock price of AMD has increased due to the announcement that its competitor, Intel, is delaying the launch of its 7-nanometer processors until 2023. This delay gives AMD a competitive advantage as it already has 7-nanometer processors in the market, and is planning to launch its 5-nanometer chips in 2022. This means AMD is ahead in the technology race, which makes its products more attractive to consumers, leading to potential increased sales and profits. This positive outlook is what\'s driving the increase in AMD\'s stock price.',
        'The stock price of Applied Materials (AMAT) has increased due to the news of China\'s increased purchasing of semiconductor equipment. China is ramping up its domestic production of semiconductors, which are crucial components in a wide range of electronic devices, in an effort to reduce its reliance on foreign suppliers. As a leading provider of semiconductor manufacturing equipment, Applied Materials stands to benefit significantly from this surge in demand. This potential for increased sales and revenue has made the company\'s stock more attractive to investors, leading to the observed increase in its stock price.\n' +
        'The stock price of Applied Materials (AMAT) has increased due to the company receiving validation from the Science Based Targets initiative (SBTi) for its commitment to reduce greenhouse gas emissions. This validation is significant as it demonstrates the company\'s dedication to environmental sustainability, which is increasingly important to investors. In the current market, companies that show a commitment to environmental, social, and governance (ESG) factors are often rewarded with increased investor interest. This news has likely boosted investor confidence in AMAT, leading to an increase in the stock\'s demand and subsequently, its price.'
      ]
    },
    {
      date: '2023-12-12',
      value: 315.75714285714287,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-13',
      value: 316.1614285714286,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-14',
      value: 312.13000000000005,
      swing: false,
      articles: [
        'https://finance.yahoo.com/m/86fafc2c-10d4-3ec4-a775-2cc644ffeefa/china-chip-gear-buying-could.html?.tsrc=rss',
        'https://www.investors.com/news/technology/semiconductor-equipment-buying-to-slow-in-china/',
        'https://finance.yahoo.com/news/viral-video-shows-built-planet-225906434.html?.tsrc=rss',
        'https://finance.yahoo.com/m/ef2949df-e803-3427-8b70-cf5c25774fe4/tesla%E2%80%99s-self-driving-tech-has.html?.tsrc=rss'
      ],
      swingTickers: ['AMAT', 'TSLA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of Applied Materials (AMAT) has increased due to the news of China\'s increased purchasing of semiconductor equipment. China is ramping up its domestic semiconductor industry in response to trade tensions and sanctions, leading to a surge in demand for the products of companies like AMAT, which is a leading supplier of semiconductor manufacturing equipment. This increased demand is expected to boost AMAT\'s sales and profits, which in turn is driving up its stock price.\n' +
        'The stock price of Applied Materials (AMAT) has increased due to the news of a slowdown in semiconductor equipment buying in China. This might seem counterintuitive at first, but AMAT, being a leading supplier of semiconductor manufacturing equipment, stands to benefit from this situation. The slowdown in China\'s buying indicates that the country\'s domestic semiconductor industry is not yet fully capable of meeting its own demands. This means that Chinese companies will likely continue to rely on foreign suppliers like AMAT for their semiconductor equipment needs. This continued demand from one of the world\'s largest markets is a positive signal for AMAT\'s future earnings, leading to an increase in its stock price.',
        'The stock price of Tesla Inc. (TSLA) has increased due to a viral video showcasing the company\'s new Gigafactory in Berlin, Germany. This video has generated significant positive publicity for Tesla, highlighting the company\'s impressive manufacturing capabilities and its commitment to expanding its operations in Europe. The Gigafactory, once operational, is expected to significantly boost Tesla\'s production capacity, enabling it to meet the growing demand for electric vehicles in the European market. This has led investors to anticipate higher future earnings for Tesla, resulting in increased buying activity for TSLA shares and a consequent rise in the stock price.\n' +
        'The stock price of Tesla (TSLA) has increased due to positive news about its self-driving technology. The article reports that Tesla\'s Full Self-Driving (FSD) technology has been praised by a well-known artificial intelligence (AI) expert, Andrej Karpathy, who stated that Tesla\'s approach to AI for its autonomous vehicles is ahead of the competition. This endorsement boosts investor confidence in Tesla\'s technological capabilities and future prospects, leading to increased demand for its shares and consequently driving up the stock price.'
      ]
    },
    {
      date: '2023-12-15',
      value: 313.8171428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-18',
      value: 318.53428571428566,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-19',
      value: 319.9485714285715,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-20',
      value: 312.60999999999996,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-21',
      value: 317.5885714285714,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/14-best-hot-stocks-buy-204355122.html?.tsrc=rss',
        'https://finance.yahoo.com/news/3-ai-stocks-ll-regret-014835767.html?.tsrc=rss'
      ],
      swingTickers: ['AMD'],
      isSwingIncrease: undefined,
      summaries: [
        `The stock price of AMD (Advanced Micro Devices) has increased due to its inclusion in a list of "14 Best Hot Stocks to Buy Now" published by Yahoo Finance. This endorsement from a reputable financial news source has likely boosted investor confidence in the company, leading to increased demand for its shares. The article highlights AMD's strong performance in the semiconductor industry, which is currently experiencing high demand due to the global digital transformation trend. This positive outlook on AMD's business prospects has likely contributed to the rise in its stock price.\n` +
        'The stock price of AMD (Advanced Micro Devices) has increased due to the company\'s significant involvement in the Artificial Intelligence (AI) sector, as highlighted in the article. AMD\'s high-performance computing and graphics solutions are integral to AI technologies, which are experiencing rapid growth and adoption across various industries. The company\'s recent advancements in AI-related hardware have positioned it as a strong competitor in the market. This, coupled with the general optimism surrounding the future of AI, has led to increased investor confidence, resulting in a rise in AMD\'s stock price.'
      ]
    },
    {
      date: '2023-12-22',
      value: 316.96571428571434,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-26',
      value: 318.9185714285714,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-27',
      value: 319.95285714285717,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-28',
      value: 319.35714285714283,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2023-12-29',
      value: 318.3185714285715,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-02',
      value: 310.7057142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-03',
      value: 305.7057142857143,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-04',
      value: 304.94571428571425,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-05',
      value: 306.4714285714286,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-08',
      value: 316.05,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/pc-industry-grows-for-first-time-in-2-years-in-q4-but-full-year-shipments-fall-to-lowest-levels-in-17-years-231022922.html?.tsrc=rss',
        'https://finance.yahoo.com/news/advanced-micro-devices-amd-stock-224517610.html?.tsrc=rss',
        'https://finance.yahoo.com/video/fpt-chairman-overseas-expansion-plans-054414284.html?.tsrc=rss',
        'https://finance.yahoo.com/news/vietnam-fpt-sees-overseas-sales-031130809.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'NVDA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD has increased due to the news that the PC industry has grown for the first time in two years during the fourth quarter. AMD, being a major player in the PC industry, benefits directly from this growth as it likely translates to increased sales of their processors and graphics cards, which are key components in many PCs. This growth in the PC industry signals a potential increase in demand for AMD\'s products, which investors interpret as a positive sign for the company\'s future earnings, leading to an increase in the stock price.\n' +
        'The stock price of Advanced Micro Devices (AMD) has increased due to the announcement of a new partnership with Samsung. This collaboration will allow Samsung to use AMD\'s graphics technology in its smartphones, which is a significant expansion of AMD\'s market. This partnership not only provides AMD with a new revenue stream, but also strengthens its competitive position in the technology sector. Investors are reacting positively to this news, buying more shares of AMD, which is driving up the stock price.',
        'The stock NVDA has increased due to the announcement by FPT Corporation, a global leading IT service provider, about their plans for overseas expansion. This expansion is expected to increase the demand for NVDA\'s products, as FPT Corporation is a significant customer of NVDA. The news of FPT\'s expansion indicates potential growth in NVDA\'s business, leading investors to buy more shares. This increased demand for NVDA\'s stock has driven up its price.\n' +
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to the news that Vietnam\'s largest listed IT services firm, FPT Corp, is expecting a boost in its overseas sales. This is largely due to the fact that FPT Corp is a key supplier for Nvidia. The positive outlook for FPT Corp\'s overseas sales suggests that there will be an increased demand for Nvidia\'s products, which in turn is likely to increase Nvidia\'s revenue and profitability. This positive financial outlook for Nvidia has led to increased investor confidence, resulting in a rise in the company\'s stock price.'
      ]
    },
    {
      date: '2024-01-09',
      value: 318.1171428571428,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-10',
      value: 321.26000000000005,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-11',
      value: 322.11428571428576,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-12',
      value: 320.5799999999999,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-16',
      value: 325.06,
      swing: false,
      articles: [
        'https://finbold.com/this-semiconductor-stock-is-gearing-up-for-a-huge-surge/?utm_source=snapi',
        'https://investorplace.com/2024/01/ai-and-the-chips-act-3-semiconductor-stocks-to-watch-in-2024/',
        'https://finance.yahoo.com/news/tsmc-outlook-drives-165-billion-013155446.html?.tsrc=rss',
        'https://finance.yahoo.com/video/china-almost-uninvestable-strategist-223908257.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'NVDA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD, a leading semiconductor company, has increased due to the anticipation of a significant surge in its performance. This expectation is primarily driven by the company\'s recent announcement of its plans to acquire Xilinx, a renowned programmable chip manufacturer. This acquisition is expected to enhance AMD\'s product portfolio and market reach, thereby boosting its revenue and profitability. Additionally, the ongoing global chip shortage has led to an increased demand for AMD\'s products, further driving up its stock price. The company\'s strong financial performance and positive growth prospects have also contributed to the bullish investor sentiment.\n' +
        'The stock price of AMD has increased due to the recent news about the CHIPS Act, which is a government initiative aimed at boosting the domestic production of semiconductors in the United States. This act is expected to provide significant financial incentives for semiconductor manufacturers, including AMD. Additionally, the growing demand for artificial intelligence (AI) technologies, which heavily rely on semiconductors, is also contributing to the positive outlook for AMD. As a result, investors are buying up shares, driving the stock price higher.',
        'The stock NVDA has increased due to the positive outlook of Taiwan Semiconductor Manufacturing Co (TSMC), the world\'s largest contract chipmaker. TSMC announced plans to increase its capital expenditure for 2021, indicating a strong demand for advanced chips. As NVIDIA (NVDA) is one of TSMC\'s major clients, this news suggests that NVIDIA will have a steady supply of chips to meet its own product demand. This positive supply chain news has likely boosted investor confidence in NVIDIA\'s ability to maintain production levels, leading to the rise in its stock price.\n' +
        'The stock NVDA, or Nvidia Corporation, has seen an increase due to the recent news about China\'s regulatory crackdown on its tech and education sectors. This has led many investors to perceive China as an almost uninvestable market, causing them to pull out their investments and look for alternatives. Nvidia, being a leading player in the global tech industry, particularly in areas like gaming, data centers, and artificial intelligence, has become an attractive option for these investors. As a result, the demand for NVDA stock has increased, driving up its price.'
      ]
    },
    {
      date: '2024-01-17',
      value: 323.55,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-18',
      value: 326.2685714285714,
      swing: false,
      articles: [
        'https://finance.yahoo.com/news/applied-materials-amat-stock-moves-225020737.html?.tsrc=rss',
        'https://seekingalpha.com/article/4663291-the-ai-trends-and-hype-for-the-coming-year'
      ],
      swingTickers: ['AMAT'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of Applied Materials (AMAT) has increased due to the company\'s strong quarterly earnings report. The report exceeded market expectations, showing higher revenues and profits than what analysts had predicted. This positive financial performance indicates that the company is in a robust financial position and is capable of generating substantial profits, which boosts investor confidence. As a result, more investors are buying the company\'s shares, leading to an increase in the stock price.\n' +
        'The stock price of Applied Materials (AMAT) has increased due to the growing trends and hype around artificial intelligence (AI) as highlighted in the article. AMAT, being a leading provider of materials engineering solutions used to produce virtually every new chip and advanced display, stands to benefit significantly from the increased demand for AI technologies. As AI systems require advanced chips for their operations, the surge in AI adoption across various industries is expected to boost the demand for AMAT\'s products and services. This potential for increased revenue and growth is likely being factored into the stock\'s price, leading to its increase.'
      ]
    },
    {
      date: '2024-01-19',
      value: 336.1342857142857,
      swing: false,
      articles: [
        'https://investorplace.com/?p=2623939',
        'https://finbold.com/this-semiconductor-stock-is-gearing-up-for-a-huge-surge/?utm_source=snapi',
        'https://www.fool.com/investing/2024/01/21/3-ai-stocks-to-buy-today-at-a-discount/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
        'https://www.fool.com/investing/2024/01/18/why-applied-materials-and-asml-holding-stocks-boun/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
        'https://finance.yahoo.com/news/zacks-analyst-blog-highlights-adobe-102200134.html?.tsrc=rss',
        'https://finance.yahoo.com/news/adobe-full-2023-earnings-eps-101029531.html?.tsrc=rss',
        'https://finance.yahoo.com/news/nvidia-ceo-makes-first-china-022348791.html?.tsrc=rss',
        'https://www.fool.com/investing/2024/01/21/history-says-nasdaq-to-gain-2-ai-stocks-to-buy/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss'
      ],
      swingTickers: ['AMD', 'AMAT', 'ADBE', 'NVDA'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD has increased due to the announcement of a new partnership with Tesla. This collaboration will see AMD providing the chips for Tesla\'s infotainment systems in their electric vehicles. This news has excited investors as it represents a significant new revenue stream for AMD, and also aligns them with Tesla, a company known for its innovation and market-leading position. The partnership also highlights AMD\'s competitive edge in the semiconductor industry, further boosting investor confidence in the company\'s future growth prospects.\n' +
        'The stock price of AMD, a leading semiconductor company, has increased due to the announcement of a new partnership with Tesla, a prominent electric vehicle manufacturer. This partnership involves AMD supplying chips for Tesla\'s infotainment system, which is a significant business expansion for AMD. Additionally, the global semiconductor industry is currently facing a supply shortage, which has led to increased demand and higher prices for AMD\'s products. This combination of a high-profile partnership and favorable market conditions has boosted investor confidence in AMD, leading to a surge in its stock price.',
        'The stock price of Applied Materials (AMAT) has increased due to a recent article published on The Motley Fool, which recommended AMAT as one of the top three AI stocks to buy at a discount. This recommendation is significant because The Motley Fool is a well-respected investment and financial advice platform, and its suggestions often influence investor behavior. The article highlighted AMAT\'s strong position in the AI industry, which is expected to grow exponentially in the coming years. This positive outlook on AMAT\'s future prospects has likely led to increased investor confidence, resulting in a surge in stock purchases and, consequently, an increase in the stock price.\n' +
        'The stock of Applied Materials (AMAT) has increased due to the company\'s strong quarterly earnings report, which exceeded market expectations. This positive financial performance is largely attributed to the growing demand for semiconductors and the company\'s successful efforts in meeting this demand. Additionally, the company\'s optimistic outlook for the future, including its plans for expansion and investment in new technologies, has boosted investor confidence, leading to an increase in the stock\'s value.',
        'The stock price of Adobe (ADBE) has increased due to the company\'s strong financial performance and positive future outlook. The article highlights that Adobe\'s revenues are expected to grow due to the increasing demand for its digital media products, such as Photoshop and Illustrator, which are widely used by professionals in the creative industry. Additionally, the company\'s cloud-based subscription model provides a steady stream of revenue, which is a positive sign for investors. Furthermore, Adobe\'s strategic acquisitions, such as Workfront, are expected to strengthen its product portfolio and boost its market position. Therefore, the combination of strong financial performance, positive future outlook, and strategic acquisitions has led to an increase in Adobe\'s stock price.\n' +
        'The stock price of Adobe (ADBE) has increased due to the company\'s strong 2023 earnings forecast. The company has projected a higher-than-expected profit for the year 2023, which indicates that Adobe\'s business operations are performing well and are expected to continue to do so in the future. This positive financial outlook has boosted investor confidence in the company, leading to increased demand for Adobe\'s stock and, consequently, a rise in its stock price.',
        'The stock price of NVDA (Nvidia Corporation) has increased due to the recent announcement by the company\'s CEO about their first data center chip technology deal in China. This is a significant development as China is a massive market and this deal represents a new and potentially lucrative revenue stream for Nvidia. Investors are reacting positively to this news, buying more shares in anticipation of future profits, which is driving up the stock price.\n' +
        'The stock NVDA has increased due to the announcement of a new artificial intelligence (AI) chip that the company has developed. This chip is expected to significantly enhance the performance of AI applications, which has generated a lot of excitement among investors. The news has led to increased confidence in the company\'s future growth prospects, as AI is a rapidly growing field with a wide range of potential applications. This optimism has translated into increased demand for NVDA\'s stock, driving up its price.'
      ]
    },
    {
      date: '2024-01-22',
      value: 334.27714285714285,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-23',
      value: 333.61428571428576,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-24',
      value: 339.4185714285714,
      swing: false,
      articles: [
        'https://www.zacks.com/stock/news/2216718/should-investors-buy-the-dip-in-intel-s-stock-after-earnings?cid=CS-STOCKNEWSAPI-FT-stocks_in_the_news-2216718',
        'https://investorplace.com/2024/01/analyst-upgrades-7-stocks-that-make-the-grade-in-q1-2024/',
        'https://finance.yahoo.com/news/avus-etf-best-both-worlds-041617227.html?.tsrc=rss',
        'https://finance.yahoo.com/news/applied-materials-amat-stock-slides-225019155.html?.tsrc=rss'
      ],
      swingTickers: ['AMD', 'AMAT'],
      isSwingIncrease: undefined,
      summaries: [
        'The stock price of AMD has increased due to negative news surrounding its competitor, Intel. Intel recently reported disappointing earnings and announced a delay in the production of its next-generation chips. This has led investors to lose confidence in Intel and instead turn to AMD, which is seen as a strong competitor in the chip-making industry. As a result, demand for AMD\'s stock has increased, driving up its price.\n' +
        'The stock price of Advanced Micro Devices (AMD) has increased due to a recent upgrade by a prominent Wall Street analyst, as reported in the linked article. This analyst has a strong track record and their opinions are highly regarded in the investment community. When they upgrade a stock, it often leads to increased investor confidence and buying activity, which can drive up the stock\'s price. In this case, the analyst has identified AMD as a top performer for the first quarter of 2024, citing the company\'s strong financial performance and positive outlook in the semiconductor industry. This endorsement has likely encouraged more investors to buy AMD shares, leading to the observed increase in its stock price.',
        'The stock AMAT (Applied Materials, Inc.) has increased due to the company\'s strong performance and positive outlook in the semiconductor industry. The article highlights that AMAT is one of the top holdings in the AVUS ETF, which is known for its focus on high-quality, undervalued stocks. This inclusion not only reflects the company\'s robust financial health but also boosts investor confidence. Furthermore, the ongoing global chip shortage and the increasing demand for semiconductors in various industries, including automotive and consumer electronics, are expected to drive the company\'s growth, thereby positively impacting its stock price.\n' +
        'The stock price of Applied Materials (AMAT) has increased due to the company\'s strong quarterly earnings report. The report exceeded analysts\' expectations, showing higher revenue and profits than predicted. This positive financial performance indicates that the company is in a healthy financial state and is capable of generating substantial profits, which boosts investor confidence. As a result, more investors are buying the company\'s shares, driving up the stock price. Additionally, the company\'s optimistic outlook for the future, including plans for expansion and innovation, further encourages investment.'
      ]
    },
    {
      date: '2024-01-25',
      value: 338.4128571428572,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    },
    {
      date: '2024-01-26',
      value: 335.61285714285714,
      swing: false,
      articles: [],
      swingTickers: [],
      isSwingIncrease: undefined,
      summaries: []
    }
  ])
}
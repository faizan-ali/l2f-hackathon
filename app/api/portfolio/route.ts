import { NextResponse } from 'next/server'

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
    ticker: 'FLNC',
    allocation: '15'
  },
  {
    ticker: 'NCLH',
    allocation: '23'
  }
]

export const GET = async (req: Request) => {
  return NextResponse.json(
    [
      {
        date: '2023-11-01',
        value: 206.63714285714283,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-02',
        value: 212.70714285714283,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/24d7c452-c9e5-38c6-962b-8a95a17a64fa/elon-musk%3A-%E2%80%98none-of-my.html?.tsrc=rss',
          'https://finance.yahoo.com/m/2fa1d673-c916-36a7-88f5-ae5a0a3d0374/why-chargepoint%2C-nikola%2C-and.html?.tsrc=rss'
        ],
        swingTickers: ['TSLA'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of Tesla (TSLA) has increased due to a recent announcement by its CEO, Elon Musk, that he has no plans to sell any of his Tesla shares. This statement has reassured investors about the stability of the company and Musk\'s continued commitment to it, leading to increased confidence in the stock. Furthermore, Musk\'s decision not to sell his shares indicates his belief in the company\'s future success, which further boosts investor sentiment and drives up the stock price.\n' +
          'The stock TSLA has increased due to the announcement of President Joe Biden\'s $2 trillion infrastructure plan, which includes a $174 billion budget to boost the electric vehicle market. This plan aims to build a network of 500,000 EV charging stations by 2030, replace diesel vehicles used by federal agencies with electric ones, and offer tax incentives to EV buyers. As Tesla is a leading player in the electric vehicle industry, this substantial government support is expected to significantly boost its sales and profitability, leading to a rise in its stock price.'
        ]
      },
      {
        date: '2023-11-03',
        value: 216.92714285714285,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/norwegian-cruise-line-holdings-ltd-200210130.html?.tsrc=rss',
          'https://finance.yahoo.com/news/norwegian-cruise-line-opens-sale-184100699.html?.tsrc=rss'
        ],
        swingTickers: ['FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock of Norwegian Cruise Line Holdings Ltd. (NCLH) has seen an increase due to the company\'s announcement of a successful $2.4 billion capital raise. This capital raise, which includes equity, debt, and exchangeable notes, will provide the company with the necessary liquidity to weather the current downturn in the cruise industry caused by the COVID-19 pandemic. The successful capital raise indicates investor confidence in the company\'s ability to survive the current crisis and return to profitability in the future, leading to a boost in the company\'s stock price.\n' +
          'The stock price of Norwegian Cruise Line Holdings (NCLH) has increased due to the company\'s announcement that it has opened sales for 2023-2024 voyages. This move indicates a positive outlook for the company\'s future operations, suggesting that they expect the travel industry to recover from the impacts of the COVID-19 pandemic. Investors are likely reacting to this news with optimism, leading to increased demand for NCLH shares and, consequently, a rise in the stock price.'
        ]
      },
      {
        date: '2023-11-06',
        value: 218.03142857142856,
        swing: false,
        articles: [
          'https://www.fool.com/investing/2023/11/02/1-stock-to-avoid-no-matter-what-and-1-worth-adding/',
          'https://www.zacks.com/stock/news/2176919/norwegian-cruise-nclh-q3-earnings-top-estimates-rise-y-y'
        ],
        swingTickers: ['NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock NCLH (Norwegian Cruise Line Holdings) has seen a decrease due to the ongoing uncertainty and challenges posed by the COVID-19 pandemic. The cruise industry has been hit hard by travel restrictions and safety concerns, leading to cancellations and reduced bookings. This has resulted in significant financial losses for companies like NCLH. Furthermore, the company\'s high debt levels and cash burn rate have raised concerns about its long-term financial stability. These factors have negatively impacted investor confidence, leading to a drop in the stock\'s value.\n' +
          'The stock NCLH (Norwegian Cruise Line Holdings Ltd.) has decreased due to the company\'s Q3 earnings report. Although the earnings topped estimates and showed a year-over-year increase, investors were likely concerned about the potential impact of the ongoing COVID-19 pandemic on the company\'s future earnings. The travel industry, including cruise lines, has been severely affected by travel restrictions and decreased consumer confidence in travel safety. This could lead to lower bookings and revenue for Norwegian Cruise Line in the coming quarters, which is likely why the stock price has decreased.'
        ]
      },
      {
        date: '2023-11-07',
        value: 221.9628571428572,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-08',
        value: 223.27428571428572,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-09',
        value: 220.6257142857143,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/teslas-china-woes-lucid-commits-041100395.html?.tsrc=rss',
          'https://finance.yahoo.com/news/tesla-stock-carries-hefty-downside-064842333.html?.tsrc=rss'
        ],
        swingTickers: ['TSLA', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The decrease in Tesla\'s stock (TSLA) can be attributed to the company\'s ongoing issues in China, where it is facing regulatory scrutiny and public backlash over safety and customer service concerns. These problems have led to a drop in sales in the world\'s largest electric vehicle market, which is a significant blow to Tesla\'s growth prospects. Additionally, competition in the electric vehicle market is intensifying, with rivals like Lucid committing to manufacturing in China, which could further erode Tesla\'s market share and negatively impact its financial performance.\n' +
          'The decrease in Tesla\'s stock (TSLA) can be attributed to the recent report by New Street Research, which suggests that the electric vehicle manufacturer\'s shares carry a significant downside risk. The report highlights concerns about Tesla\'s ability to maintain its current market share in the electric vehicle industry, especially with increasing competition from traditional automakers who are also shifting towards electric vehicles. Additionally, the report also points out that Tesla\'s current valuation is not justified by its earnings potential, indicating that the stock may be overpriced. This negative sentiment from a reputable research firm can lead to a sell-off among investors, causing the stock price to drop.'
        ]
      },
      {
        date: '2023-11-10',
        value: 227.83142857142863,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/applied-materials-amat-expected-beat-150015510.html?.tsrc=rss',
          'https://finance.yahoo.com/news/now-time-look-buying-applied-120020319.html?.tsrc=rss'
        ],
        swingTickers: ['AMAT'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of Applied Materials (AMAT) has increased due to the anticipation of a positive earnings report. Investors are expecting the company to outperform its quarterly earnings estimates, which is often a good indicator of future stock performance. This optimism is based on the company\'s strong track record of beating earnings estimates in the past, as well as the current favorable market conditions for the semiconductor industry. As a result, investors are buying more shares, driving up the stock price.\n' +
          'The stock price of Applied Materials (AMAT) has increased due to a combination of factors. Firstly, the company\'s strong financial performance, including a 41% increase in earnings, has boosted investor confidence. Secondly, the company\'s strategic investments in areas such as artificial intelligence and big data are expected to drive future growth. Finally, the company\'s stock is currently undervalued according to some metrics, making it an attractive buy for investors. This combination of strong performance, future growth potential, and attractive valuation has led to increased demand for the stock, driving up its price.'
        ]
      },
      {
        date: '2023-11-13',
        value: 228.07571428571433,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-14',
        value: 235.0157142857143,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/168b7aea-e4f8-3298-bb6d-102a5c7259ec/dow-jones-futures%3A-s%26p-500.html?.tsrc=rss',
          'https://finance.yahoo.com/m/8dbbba0b-017b-3ee1-b5f1-ea358dd07141/hyundai-to-be-first-automaker.html?.tsrc=rss',
          'https://finance.yahoo.com/news/fluence-energy-inc-announces-executive-210000309.html?.tsrc=rss',
          'https://finance.yahoo.com/news/analyst-upgrades-7-stocks-just-044348207.html?.tsrc=rss',
          'https://finance.yahoo.com/m/7523f9e7-b6c9-3669-aebf-316702146ac1/ceos-are-talking-about-the.html?.tsrc=rss',
          'https://www.barrons.com/articles/taylor-swift-cruise-78af822e'
        ],
        swingTickers: ['TSLA', 'FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The increase in Tesla\'s stock (TSLA) can be attributed to the company\'s announcement of a 5-for-1 stock split, which is set to take place at the end of August. This move is expected to make the stock more accessible to individual investors by lowering the price of individual shares. The anticipation of increased demand from these investors, coupled with the general positive sentiment around the company\'s recent profitability streak, has led to a surge in Tesla\'s stock price.\n' +
          'The stock price of Tesla (TSLA) has increased due to the news that Hyundai, a major competitor in the electric vehicle market, is facing a significant setback. Hyundai is recalling 82,000 electric vehicles due to battery issues, which is not only costly but also damages the company\'s reputation in the electric vehicle industry. This situation benefits Tesla as it may lead to a shift in consumer preference towards Tesla\'s electric vehicles, which are perceived as more reliable. This potential increase in demand for Tesla\'s products is likely driving the increase in its stock price.',
          'The stock price of FLNC (Fluence Energy Inc.) has seen an increase due to the company\'s recent announcement of a new executive leadership team. This change in management is often viewed positively by investors as it signals a potential shift in company strategy and operations, which could lead to improved performance and profitability. In this case, the new leadership team brings a wealth of experience and expertise, further boosting investor confidence in the company\'s future prospects. This increased confidence is reflected in the rising stock price.\n' +
          'The stock FLNC has seen an increase due to a recent upgrade by a prominent analyst. This upgrade is a signal to investors that the company\'s financial health and future prospects are strong, which boosts investor confidence and encourages more buying activity. As more investors buy the stock based on this positive outlook, the demand for the stock increases, which in turn drives up the stock price.',
          'The stock price of Norwegian Cruise Line Holdings (NCLH) has increased due to the positive sentiment expressed by the company\'s CEO about the future of the cruise industry. The CEO\'s optimistic outlook, which includes expectations of a strong rebound in bookings and a return to pre-pandemic operations, has boosted investor confidence in the company\'s potential for recovery and growth. This renewed confidence has led to increased buying activity, driving up the price of NCLH stock.\n' +
          'The stock NCLH (Norwegian Cruise Line Holdings) has seen an increase due to the announcement of a partnership with popular singer Taylor Swift. This partnership, which includes a concert by Swift on one of the company\'s ships, is expected to boost the company\'s visibility and appeal, particularly among Swift\'s large and dedicated fan base. This increased visibility and potential for higher bookings has led to increased investor confidence, resulting in a rise in the company\'s stock price.'
        ]
      },
      {
        date: '2023-11-15',
        value: 233.48714285714283,
        swing: false,
        articles: [],
        swingTickers: ['NCLH'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-16',
        value: 233.99857142857144,
        swing: false,
        articles: [],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-17',
        value: 233.31857142857143,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/fluence-energy-inc-announces-executive-210000309.html?.tsrc=rss',
          'https://finance.yahoo.com/news/analyst-upgrades-7-stocks-just-044348207.html?.tsrc=rss'
        ],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of Fluence Energy Inc. (FLNC) has seen an increase due to the company\'s recent announcement of a new executive leadership team. This change in management is often viewed positively by investors as it signals a potential shift in company strategy and operations, which could lead to improved performance and profitability. In this case, the new leadership team is expected to bring fresh perspectives and innovative ideas to the company, thereby boosting investor confidence and driving up the stock price.\n' +
          'The stock FLNC has seen an increase due to a recent upgrade by a prominent analyst. This upgrade is a signal to investors that the company\'s financial health and future prospects are strong, which in turn boosts confidence and encourages more people to buy the stock. This increased demand drives up the stock\'s price. Additionally, analyst upgrades often generate media attention, which can attract new investors and further drive up the price.'
        ]
      },
      {
        date: '2023-11-20',
        value: 237.19714285714284,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-21',
        value: 236.18142857142857,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-22',
        value: 235.20714285714288,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-24',
        value: 234.07428571428568,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-27',
        value: 234.95857142857145,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-11-28',
        value: 236.15285714285716,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/futures-mostly-higher-tesla-reveals-051344810.html?.tsrc=rss',
          'https://www.cnn.com/2023/11/30/business/tesla-delivers-first-cybertruck-into-a-tougher-new-world?cid=external-feeds_iluminar_yahoo&.tsrc=rss',
          'https://finance.yahoo.com/news/fluence-named-official-un-global-213000793.html?.tsrc=rss',
          'https://finance.yahoo.com/news/compared-estimates-fluence-energy-inc-143005459.html?.tsrc=rss'
        ],
        swingTickers: ['TSLA', 'FLNC'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of Tesla (TSLA) has increased due to the company\'s recent announcement of a new, more affordable electric vehicle model. This news has excited investors as it indicates that Tesla is expanding its market reach to include a wider range of consumers. The introduction of a cheaper model could potentially boost Tesla\'s sales volume, leading to higher revenues and profits. This positive outlook is reflected in the rising stock price.\n' +
          'The stock price of Tesla (TSLA) has increased due to the company\'s successful delivery of its first Cybertruck. This achievement is significant as it demonstrates Tesla\'s ability to follow through on its promises, thereby boosting investor confidence in the company\'s operational capabilities. Furthermore, the Cybertruck\'s launch into a challenging market environment showcases Tesla\'s resilience and adaptability, factors that are highly valued by investors. This positive news has led to increased buying activity for TSLA shares, driving up the stock price.',
          'The stock FLNC has seen an increase due to the company, Fluence, being named as an official partner of the United Nations Global Compact. This partnership is significant as it aligns Fluence with the UN\'s sustainability goals, which could potentially open up new opportunities and markets for the company. Investors are likely reacting positively to this news, as it not only enhances the company\'s reputation but also indicates potential for future growth, leading to the rise in the stock\'s price.\n' +
          'The stock FLNC has increased due to Fluence Energy Inc\'s recent financial performance, which exceeded market expectations. The company reported higher earnings per share (EPS) and revenue than what analysts had predicted, indicating strong financial health and operational efficiency. This positive financial news has boosted investor confidence in the company\'s growth potential, leading to increased demand for the stock and consequently driving up its price.'
        ]
      },
      {
        date: '2023-11-29',
        value: 236.57999999999996,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/fluence-energy-inc-nasdaq-flnc-150432065.html?.tsrc=rss',
          'https://finance.yahoo.com/news/fluence-energy-inc-reports-fourth-221900797.html?.tsrc=rss'
        ],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of Fluence Energy Inc. (FLNC) has increased due to the company\'s announcement of a new partnership with a major utility company, which is expected to boost its revenue and profitability. This partnership will allow Fluence Energy to expand its operations and reach a larger customer base, thereby increasing its market share. Additionally, the company\'s recent successful completion of a large-scale energy storage project has also contributed to the positive investor sentiment, as it demonstrates the company\'s technical capabilities and potential for future growth.\n' +
          'The stock of Fluence Energy Inc. (FLNC) has seen an increase due to the company\'s strong fourth quarter results. The company reported a significant rise in revenue, which exceeded market expectations, and also announced a positive outlook for the upcoming year. This financial performance indicates a robust business model and strong market demand for their products and services. Investors are likely reacting positively to this news, buying more shares and driving up the stock price.'
        ]
      },
      {
        date: '2023-11-30',
        value: 232.8685714285714,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-01',
        value: 233.44571428571427,
        swing: false,
        articles: [],
        swingTickers: ['NCLH'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-04',
        value: 229.50285714285715,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/fluence-named-official-un-global-213000793.html?.tsrc=rss',
          'https://finance.yahoo.com/news/compared-estimates-fluence-energy-inc-143005459.html?.tsrc=rss'
        ],
        swingTickers: ['FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock FLNC, which represents Fluence Corporation, has seen an increase due to the company being named an official partner of the United Nations Global Compact. This partnership is significant as it aligns Fluence with the UN\'s sustainable development goals, which could potentially open up new opportunities and markets for the company. Investors are likely reacting positively to this news, driving up the stock price, as it not only enhances the company\'s reputation but also indicates potential for increased future profitability.\n' +
          'The stock FLNC has increased due to Fluence Energy Inc\'s recent financial performance, which exceeded market expectations. The company reported higher earnings per share (EPS) and revenue than what analysts had predicted, indicating strong financial health and operational efficiency. This positive surprise typically leads to a surge in investor confidence, causing an increase in demand for the company\'s stock and subsequently driving up its price.'
        ]
      },
      {
        date: '2023-12-05',
        value: 230.63714285714286,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-06',
        value: 227.45714285714286,
        swing: false,
        articles: [],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-07',
        value: 233.5542857142857,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/bbcc210e-3e10-308f-a129-6a1b70ff4584/nvidia-is-not-the-only.html?.tsrc=rss',
          'https://finance.yahoo.com/news/amd-ceo-debuts-nvidia-chip-182428413.html?.tsrc=rss'
        ],
        swingTickers: ['AMD'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of AMD has increased due to the company\'s announcement of a new product, the Radeon RX 6700 XT graphics card, which is expected to compete favorably with similar products from its rival, Nvidia. This new product is anticipated to meet the high demand for gaming and computing graphics cards in the market, which has been exacerbated by the global chip shortage. The potential increase in sales and market share from this new product has made investors more optimistic about AMD\'s future earnings, leading to an increase in its stock price.\n' +
          'The stock price of AMD has increased due to the announcement made by the company\'s CEO about the debut of a new chip that rivals Nvidia\'s product. This new chip, which is designed for data centers, is expected to boost AMD\'s competitiveness in the market. The anticipation of increased sales and market share from this new product has led to positive investor sentiment, resulting in a rise in AMD\'s stock price.'
        ]
      },
      {
        date: '2023-12-08',
        value: 235.1657142857143,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-11',
        value: 237.30428571428573,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/86fafc2c-10d4-3ec4-a775-2cc644ffeefa/china-chip-gear-buying-could.html?.tsrc=rss',
          'https://finance.yahoo.com/news/applied-materials-receives-sbti-validation-133000081.html?.tsrc=rss'
        ],
        swingTickers: ['AMAT'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of AMAT, or Applied Materials, has increased due to a surge in demand for semiconductor equipment from China. This is because China is trying to become more self-reliant in the technology sector and reduce its dependence on foreign suppliers. As a result, Chinese companies are buying more chip-making equipment, which is driving up sales for companies like Applied Materials that manufacture this type of equipment. This increased demand is positively impacting AMAT\'s revenue and profitability, leading to a rise in its stock price.\n' +
          'The stock price of Applied Materials (AMAT) has increased due to the company receiving validation from the Science Based Targets initiative (SBTi) for its commitment to reduce greenhouse gas emissions. This validation is significant as it demonstrates the company\'s dedication to environmental sustainability, which is increasingly important to investors. Furthermore, this validation can enhance the company\'s reputation, making it more attractive to both current and potential investors, thereby driving up the demand for its stock.'
        ]
      },
      {
        date: '2023-12-12',
        value: 240.17142857142858,
        swing: false,
        articles: [],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-13',
        value: 240.2557142857143,
        swing: false,
        articles: [
          'https://investorplace.com/2023/12/cooling-inflation-and-the-feds-next-move/'
        ],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock FLNC has seen an increase due to the cooling inflation and the Federal Reserve\'s upcoming decisions. The easing inflation means that the cost of goods and services is not increasing as rapidly, which can boost consumer spending and overall economic activity. This is beneficial for companies like FLNC as it can lead to increased sales and profits. Additionally, the Federal Reserve\'s next move could potentially involve lowering interest rates or implementing other policies that stimulate the economy. Such actions would make borrowing cheaper for businesses, potentially leading to increased investment and growth for companies like FLNC. Therefore, the anticipation of these events has led to a rise in FLNC\'s stock price.'
        ]
      },
      {
        date: '2023-12-14',
        value: 237.71142857142857,
        swing: false,
        articles: [
          'https://www.fool.com/investing/2023/12/16/better-cloud-stock-adobe-vs-salesforce/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
          'https://finance.yahoo.com/video/top-ai-stock-picks-2024-123001109.html?.tsrc=rss',
          'https://finance.yahoo.com/news/viral-video-shows-built-planet-225906434.html?.tsrc=rss',
          'https://finance.yahoo.com/m/ef2949df-e803-3427-8b70-cf5c25774fe4/tesla%E2%80%99s-self-driving-tech-has.html?.tsrc=rss'
        ],
        swingTickers: ['ADBE', 'TSLA', 'FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The decrease in Adobe\'s stock (ADBE) can be attributed to the recent comparison made between Adobe and Salesforce, where the latter was favored as a better cloud stock investment. This comparison likely led investors to shift their focus and funds towards Salesforce, causing a decrease in demand for Adobe\'s stock. Additionally, any perceived shortcomings in Adobe\'s cloud services, highlighted by this comparison, could have negatively impacted investor confidence in the company\'s future performance, further contributing to the stock price decline.\n' +
          'The decrease in Adobe\'s stock (ADBE) can be attributed to the recent news about the company\'s disappointing quarterly earnings report. The report showed that Adobe\'s earnings and revenue fell short of Wall Street\'s expectations, which has led to a loss of investor confidence. This is because the earnings report is a key indicator of a company\'s financial health and profitability. When a company fails to meet the expectations set by analysts, it can lead to a sell-off of the company\'s stock as investors reassess the company\'s potential for future growth and profitability.',
          'The stock price of Tesla Inc. (TSLA) has seen an increase due to a viral video showcasing the company\'s Gigafactory in Shanghai, China. This video, which highlights the factory\'s impressive size and advanced technology, has generated positive publicity for Tesla and reinforced its image as a leading innovator in the electric vehicle industry. The Gigafactory\'s high production capacity also suggests that Tesla is well-positioned to meet growing demand for electric cars in China, the world\'s largest auto market. This potential for increased sales is likely contributing to the rise in Tesla\'s stock price.\n' +
          'The stock price of Tesla (TSLA) has increased due to positive news about its self-driving technology. The company\'s Autopilot system has been found to be significantly safer than human driving, according to a report from the National Highway Traffic Safety Administration. This news has boosted investor confidence in Tesla\'s ability to lead in the autonomous vehicle market, leading to an increase in demand for its shares and consequently, a rise in its stock price.'
        ]
      },
      {
        date: '2023-12-15',
        value: 239.2042857142857,
        swing: false,
        articles: [],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-18',
        value: 242.5528571428571,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-19',
        value: 244.0414285714286,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-20',
        value: 237.0828571428571,
        swing: false,
        articles: [
          'https://seekingalpha.com/article/4659189-fluence-energy-diablo-lawsuit-doesnt-diminish-long-term-bullishnes'
        ],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock FLNC has decreased due to a lawsuit filed against Fluence Energy, the company behind the stock. The lawsuit, known as the Diablo lawsuit, alleges that Fluence Energy failed to deliver on a contract, which has raised concerns among investors about the company\'s reliability and ability to fulfill its obligations. This has led to a loss of investor confidence, resulting in a decrease in the demand for FLNC stock and subsequently, a drop in its price.'
        ]
      },
      {
        date: '2023-12-21',
        value: 241.67142857142858,
        swing: false,
        articles: [
          'https://www.marketbeat.com/originals/the-truth-behind-small-cap-stocks-and-a-dovish-fed/?utm_source=snapi'
        ],
        swingTickers: ['FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock NCLH (Norwegian Cruise Line Holdings) has seen an increase due to the Federal Reserve\'s dovish stance on monetary policy. This stance means the Fed is likely to keep interest rates low to stimulate the economy, which is beneficial for companies like NCLH that have high levels of debt. Lower interest rates reduce the cost of borrowing and make it easier for these companies to service their debt. Additionally, the dovish policy can lead to increased consumer spending, which can boost revenues for companies in the travel and leisure industry like NCLH.'
        ]
      },
      {
        date: '2023-12-22',
        value: 241.06285714285715,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-26',
        value: 243.01857142857142,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-27',
        value: 243.9414285714286,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-28',
        value: 242.98,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2023-12-29',
        value: 241.95285714285714,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-02',
        value: 235.04142857142855,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/advanced-micro-devices-amd-rises-224518922.html?.tsrc=rss',
          'https://finance.yahoo.com/m/8f1d455e-412d-39b0-8ea5-c03a682283ab/does-nvidia-stock-still-have.html?.tsrc=rss',
          'https://finance.yahoo.com/news/heres-why-applied-materials-amat-225018665.html?.tsrc=rss',
          'https://finance.yahoo.com/news/q4-earnings-season-scorecard-research-162800128.html?.tsrc=rss',
          'https://finance.yahoo.com/news/norwegian-cruise-line-nclh-increases-231517079.html?.tsrc=rss',
          'https://finance.yahoo.com/news/oceania-cruises-announces-inspiring-voyages-133000719.html?.tsrc=rss'
        ],
        swingTickers: ['AMD', 'AMAT', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The decrease in AMD\'s stock price can be attributed to the recent news about the company\'s disappointing quarterly earnings report. The report showed that AMD\'s revenue and earnings per share were below analysts\' expectations, which indicates that the company is not performing as well as investors had hoped. This negative financial performance has likely shaken investor confidence in AMD, leading to a sell-off of the company\'s shares and a subsequent drop in its stock price.\n' +
          'The stock price of AMD has decreased due to the announcement of a new product by its competitor, Nvidia. Nvidia\'s new product, a graphics processing unit (GPU), is expected to outperform AMD\'s similar products in terms of speed and efficiency. This has led investors to believe that Nvidia will gain a larger market share in the GPU industry, which could negatively impact AMD\'s sales and profits. As a result, investors are selling their AMD shares, leading to a decrease in the stock\'s price.',
          'The stock price of Applied Materials (AMAT) has decreased due to a combination of factors. Firstly, the company\'s earnings report showed a decline in profits, which has made investors wary about the company\'s future profitability. Secondly, the ongoing trade war between the U.S. and China has created uncertainty in the market, causing investors to pull back from stocks like AMAT that have significant exposure to the Chinese market. Lastly, the overall downturn in the tech sector has also contributed to the decline in AMAT\'s stock price, as investors are moving their money to safer sectors.\n' +
          'The stock AMAT has decreased due to the company\'s disappointing Q4 earnings report. The earnings report is a summary of a company\'s financial performance over a specific period, and it plays a significant role in influencing the stock\'s price. If the earnings report shows that the company is not performing as well as expected, investors may lose confidence and sell their shares, leading to a decrease in the stock price. In AMAT\'s case, the Q4 earnings report did not meet the expectations of investors, leading to a decrease in the stock\'s value.',
          'The stock NCLH (Norwegian Cruise Line Holdings) has decreased due to the company\'s decision to increase its public share offering from $250 million to $400 million. This move dilutes the value of existing shares, which can lead to a decrease in the stock price. Additionally, the company is also selling $750 million in exchangeable senior notes, which is a form of debt. This further increases the company\'s liabilities, creating uncertainty about its financial stability and future profitability, thereby negatively impacting the stock price.\n' +
          'The stock NCLH (Norwegian Cruise Line Holdings) has decreased due to the announcement of new voyages by its subsidiary, Oceania Cruises, for the 2023-2024 season. While this might seem like positive news, the market is likely reacting to the implicit confirmation that the cruise industry\'s recovery from the pandemic will be a long-term process. The announcement suggests that normal operations and revenue levels may not resume until 2023 or later, which is likely causing investor uncertainty and leading to a drop in NCLH\'s stock price.'
        ]
      },
      {
        date: '2024-01-03',
        value: 230.35714285714286,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/norwegian-cruise-line-nclh-rises-230020750.html?.tsrc=rss',
          'https://finance.yahoo.com/news/travel-stocks-extend-rally-amid-volatile-first-week-of-year-170114346.html?.tsrc=rss'
        ],
        swingTickers: ['FLNC', 'NCLH'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock NCLH (Norwegian Cruise Line Holdings) has decreased due to the ongoing global health crisis, which has led to a significant drop in travel and tourism. The company has been forced to halt all its cruises, leading to a substantial loss in revenue. Additionally, the uncertainty about when the pandemic will end and when people will feel comfortable traveling again has made investors nervous, causing them to sell their shares and leading to a decrease in the stock\'s price.\n' +
          'The stock NCLH (Norwegian Cruise Line Holdings) has decreased due to the ongoing uncertainty and volatility in the travel industry caused by the COVID-19 pandemic. The company, like many in the travel sector, has been significantly impacted by travel restrictions and changes in consumer behavior. Despite some positive news about potential vaccines, the market is still cautious about the recovery of the travel industry, leading to a decrease in the value of stocks like NCLH.'
        ]
      },
      {
        date: '2024-01-04',
        value: 229.97285714285718,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-05',
        value: 231.42000000000002,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-08',
        value: 240.1457142857143,
        swing: false,
        articles: [
          'https://www.zacks.com/stock/news/2208513/advanced-micro-devices-amd-stock-falls-amid-market-uptick-what-investors-need-to-know',
          'https://seekingalpha.com/article/4662217-amd-prepare-for-the-ai-boom',
          'https://finance.yahoo.com/video/fpt-chairman-overseas-expansion-plans-054414284.html?.tsrc=rss',
          'https://finance.yahoo.com/news/vietnam-fpt-sees-overseas-sales-031130809.html?.tsrc=rss'
        ],
        swingTickers: ['AMD', 'NVDA'],
        isSwingIncrease: undefined,
        summaries: [
          'The rise in AMD\'s stock price can be attributed to the company\'s strong financial performance and positive market sentiment. AMD has been consistently delivering robust quarterly results, which have exceeded market expectations. This has boosted investor confidence in the company\'s growth prospects. Additionally, the overall market uptick has also played a significant role in driving the stock price up. The positive market sentiment, driven by factors such as economic recovery and easing of pandemic-related restrictions, has led to increased investor interest in stocks like AMD.\n' +
          'The stock price of Advanced Micro Devices (AMD) has increased due to the company\'s strong positioning for the upcoming boom in artificial intelligence (AI). AMD\'s high-performance computing and graphics solutions are expected to be in high demand as AI technology continues to grow and evolve. This is because AI requires powerful processing capabilities, which AMD\'s products can provide. Furthermore, AMD\'s recent acquisition of Xilinx, a leader in adaptive computing solutions, has further strengthened its standing in the AI market. This acquisition allows AMD to offer a wider range of high-performance computing solutions, making it an even more attractive option for businesses looking to invest in AI technology.',
          'The stock NVDA has increased due to the announcement of FPT Corporation\'s plans for overseas expansion. As a leading global technology service company, FPT\'s growth can directly impact NVDA, a prominent player in the tech industry. This expansion indicates a potential increase in demand for NVDA\'s products and services, as FPT may require more technological resources to facilitate its growth. Investors, anticipating this increased demand, are likely buying more shares of NVDA, driving up the stock price.\n' +
          'The stock price of NVDA (Nvidia Corporation) has increased due to the announcement of a partnership with Vietnam\'s largest listed company, FPT Corp. This collaboration is aimed at developing smart city projects and digital transformation, which will utilize Nvidia\'s artificial intelligence technology. This partnership is expected to boost Nvidia\'s overseas sales, particularly in Asia, and this positive outlook has led to an increase in the company\'s stock price.'
        ]
      },
      {
        date: '2024-01-09',
        value: 241.69857142857146,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-10',
        value: 243.71,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-11',
        value: 244.47428571428574,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-12',
        value: 242.4771428571428,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-16',
        value: 247.25285714285715,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/0d8343b5-c19b-3f74-a12c-1359a1ce3df5/stocks-to-watch-thursday%3A.html?.tsrc=rss',
          'https://www.fool.com/investing/2024/01/18/why-semiconductor-stocks-jumped-today/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss'
        ],
        swingTickers: ['AMD'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of AMD, a leading semiconductor company, has increased due to the announcement of a new partnership with Tesla. This collaboration will see AMD providing the chips for Tesla\'s infotainment systems in their electric vehicles. This partnership is a significant business development for AMD, as Tesla is a major player in the automotive industry. The deal not only provides a new revenue stream for AMD, but also boosts its reputation in the market, leading to increased investor confidence and a subsequent rise in the company\'s stock price.\n' +
          'The stock price of AMD, a leading semiconductor company, has seen an increase due to a surge in demand for semiconductors. This demand is driven by the growing need for advanced chips in various sectors such as technology, automotive, and consumer electronics. As these industries continue to expand and innovate, the requirement for semiconductors escalates, leading to a positive outlook for companies like AMD that manufacture these essential components. This optimistic market sentiment is reflected in the rising stock price of AMD.'
        ]
      },
      {
        date: '2024-01-17',
        value: 246.01714285714283,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-18',
        value: 248.08857142857147,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/applied-materials-amat-stock-moves-225020737.html?.tsrc=rss',
          'https://seekingalpha.com/article/4663291-the-ai-trends-and-hype-for-the-coming-year'
        ],
        swingTickers: ['AMAT'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock of Applied Materials (AMAT) has seen an increase due to the company\'s strong quarterly earnings report. The company, which is a key player in the semiconductor industry, reported earnings and revenue that exceeded Wall Street\'s expectations. This positive financial performance is a result of the high demand for semiconductors, driven by the growing need for advanced technology in various sectors such as automotive, consumer electronics, and data centers. The strong earnings report has boosted investor confidence in the company\'s growth prospects, leading to an increase in the stock price.\n' +
          'The stock price of AMAT, or Applied Materials, has increased due to the growing trends and hype around artificial intelligence (AI) for the upcoming year. As a leading provider of materials engineering solutions used to produce virtually every new chip and advanced display in the world, AMAT is well-positioned to benefit from the surge in demand for AI technologies. This is because AI systems require advanced chips for their operations, and as more companies invest in AI, the demand for these chips increases. Consequently, this heightened demand is likely to boost AMAT\'s sales and profits, leading to a rise in its stock price.'
        ]
      },
      {
        date: '2024-01-19',
        value: 256.93142857142857,
        swing: false,
        articles: [
          'https://finance.yahoo.com/news/amd-downgraded-market-perform-due-075924863.html?.tsrc=rss',
          'https://finance.yahoo.com/news/advanced-micro-devices-superstar-stock-115107798.html?.tsrc=rss',
          'https://www.fool.com/investing/2024/01/21/3-ai-stocks-to-buy-today-at-a-discount/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
          'https://www.fool.com/investing/2024/01/18/why-applied-materials-and-asml-holding-stocks-boun/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss'
        ],
        swingTickers: ['AMD', 'AMAT'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of AMD has increased due to the company\'s strong performance in the semiconductor market. AMD\'s new product launches, such as the Ryzen 5000 series of desktop processors, have been well-received and are driving growth. Additionally, the company\'s acquisition of Xilinx, a leader in adaptive computing solutions, is expected to boost AMD\'s product portfolio and market share. This positive momentum, coupled with the ongoing global chip shortage which has increased demand for AMD\'s products, has led to a rise in the company\'s stock price.\n' +
          'The stock price of Advanced Micro Devices (AMD) has increased due to a combination of factors. Firstly, the company has been performing well, with strong sales and earnings growth, which has boosted investor confidence. Secondly, the company has been gaining market share from its competitors, which suggests that it is well-positioned to capitalize on the growing demand for semiconductors. Lastly, the company has been making strategic acquisitions, such as the purchase of Xilinx, which is expected to enhance its product portfolio and drive future growth. These factors have made AMD an attractive investment, leading to an increase in its stock price.',
          'The stock of Applied Materials (AMAT) has seen an increase due to its strong position in the artificial intelligence (AI) sector. The company, which is a leading provider of materials engineering solutions used to produce virtually every new chip and advanced display, is expected to benefit from the growing demand for AI technologies. As more industries adopt AI for various applications, the need for advanced chips and displays also increases. This trend is likely to boost the company\'s sales and profitability, making its stock more attractive to investors.\n' +
          'The stock price of Applied Materials (AMAT) has increased due to the company\'s strong quarterly earnings report, which exceeded market expectations. This positive financial performance is largely attributed to the high demand for semiconductors and the company\'s leading role in supplying the necessary equipment for their production. Furthermore, the company\'s optimistic outlook for the future, including expectations of continued growth in the semiconductor market, has boosted investor confidence, leading to an uptick in the stock\'s value.'
        ]
      },
      {
        date: '2024-01-22',
        value: 254.85714285714286,
        swing: false,
        articles: [],
        swingTickers: ['FLNC'],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-23',
        value: 254.24142857142857,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      },
      {
        date: '2024-01-24',
        value: 259.8357142857143,
        swing: false,
        articles: [
          'https://finance.yahoo.com/m/6d4f2560-a67a-3f79-bd51-03f8adf7b162/dow-jones-futures%3A-earnings.html?.tsrc=rss',
          'https://finance.yahoo.com/m/4b32d997-3ab8-3449-9739-76a600dfc3c2/stocks-notch-weekly-gains%3B.html?.tsrc=rss'
        ],
        swingTickers: ['AMD'],
        isSwingIncrease: undefined,
        summaries: [
          'The stock price of AMD has increased due to the company\'s strong quarterly earnings report. This report showed that AMD\'s revenue and profits have exceeded expectations, indicating that the company is performing well financially. This positive financial performance is likely due to increased demand for AMD\'s products, such as its computer processors and graphics cards. When a company reports strong earnings, it often leads to increased investor confidence, which can drive up the stock price.\n' +
          'The stock price of AMD has increased due to the company\'s announcement of a new product line, which has sparked investor optimism. The new product line includes a high-performance computing chip that is expected to compete favorably against rival products in the market. This development suggests that AMD is making significant strides in innovation and competitiveness, which could potentially lead to increased market share and higher revenues in the future. Therefore, investors are buying more shares, driving up the stock price.'
        ]
      },
      {
        date: '2024-01-25',
        value: 259.01428571428573,
        swing: false,
        articles: [
          'https://www.fool.com/investing/2024/01/27/where-will-teslas-stock-price-be-in-2-years/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss',
          'https://www.fool.com/investing/2024/01/27/forget-tesla-consider-millionaire-maker-stock/?source=eptyholnk0000202&utm_source=yahoo-host-full&utm_medium=feed&utm_campaign=article&.tsrc=rss'
        ],
        swingTickers: ['TSLA'],
        isSwingIncrease: undefined,
        summaries: [
          'The decrease in Tesla\'s stock (TSLA) can be attributed to the recent news about potential production and delivery issues. The company is facing challenges in meeting its production targets due to supply chain disruptions and labor shortages. This has raised concerns among investors about Tesla\'s ability to maintain its growth trajectory and meet its revenue forecasts. Additionally, the company\'s high valuation relative to its earnings has also been a point of concern for some investors, leading to selling pressure on the stock.\n' +
          `The decrease in Tesla's (TSLA) stock price can be attributed to the recent news suggesting that investors should consider other "millionaire-maker" stocks over Tesla. This kind of news can create a sense of uncertainty and doubt among investors about the future performance of Tesla, leading them to sell their shares. As more investors sell their shares, the supply of the stock increases, which can cause the stock price to drop. This is a common reaction in the stock market when there is negative news or sentiment about a particular company.`
        ]
      },
      {
        date: '2024-01-26',
        value: 255.5685714285714,
        swing: false,
        articles: [],
        swingTickers: [],
        isSwingIncrease: undefined,
        summaries: []
      }
    ])
}
import React from 'react'
import { PortfolioData } from '../app/insights/page'

export interface PortfolioInsights extends Pick<PortfolioData, 'articles' | 'swingTickers' | 'summaries' | 'date'> {}

interface InsightCardProps {
  insights: PortfolioInsights
}
export default function InsightCard({ insights }: InsightCardProps) {
  return (
    <div className='fixed top-1/2 transform -translate-y-1/2 left-20 flex p-4 z-50'>
      <div className='flex-shrink-0 max-w-sm mx-2 bg-gray-100 rounded-md overflow-hidden shadow-lg z-50'>
        <div className='p-6'>
          <h3 className='font-semibold'>{insights.date}</h3>

          {insights.swingTickers.map((ticker, index) => (
            <span key={index} className='inline-block px-2 py-0.2 rounded-full bg-blue-500 text-white mr-2 mt-2'>
              {ticker}
            </span>
          ))}
          <p className='text-gray-700 text-sm mt-2'>{insights.summaries[0]}</p>
          <ul className='list-disc mt-3'>
            {insights.articles.map((i, index) => (
              <li key={index}>
                <a href={i} target='_blank' className='text-blue-500 underline text-sm'>
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

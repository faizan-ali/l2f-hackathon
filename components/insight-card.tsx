import React from 'react'
import { PortfolioData } from '../app/insights/page'

export interface PortfolioInsights extends Pick<PortfolioData, 'articles' | 'swingTickers' | 'summaries' | 'date'> {}

interface InsightCardProps {
  insights: PortfolioInsights
}
export default function InsightCard({ insights }: InsightCardProps) {
  const [showFullDescription, setShowFullDescription] = React.useState<boolean>(false)
  const [showSources, setShowSources] = React.useState<boolean>(false)
  const characterMax = 100

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
          <p className={`text-gray-700 text-sm mt-2`}>{showFullDescription ? insights.summaries[0] : insights.summaries[0].substring(0, characterMax)}</p>

          {showSources && (
            <ul className='list-disc mt-3'>
              {insights.articles.map((i, index) => (
                <li key={index}>
                  <a href={i} target='_blank' className='text-red-500 underline text-sm'>
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className='flex flex-row space-x-2 mt-4'>
            <span onClick={() => setShowFullDescription(!showFullDescription)} className='text-blue-500 underline text-sm cursor-pointer'>
              {showFullDescription ? 'See less' : 'See more'}
            </span>
            <span onClick={() => setShowSources(!showSources)} className='text-blue-500 underline text-sm cursor-pointer'>
              {showSources ? 'Close sources' : 'View sources'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

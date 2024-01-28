'use client'
import { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Line, XAxis, YAxis } from 'recharts'

import InsightCard from '../../components/insight-card'
import { type PortfolioInsights } from '../../components/insight-card'

export interface PortfolioData {
  value: number
  date: string
  swing: boolean | undefined
  articles: string[]
  swingTickers: string[]
  summaries: string[]
}

const CustomizedDot = props => {
  const { cx, cy, stroke, payload, value } = props
  const isFilled = payload && payload.swing // indicator if there was a swing on this day

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5} // Adjust the radius according to your preference
      fill={isFilled ? '#1651d0' : 'white'}
      stroke='#1651d0'
      strokeWidth={2}
    />
  )
}
export default function Overview() {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([])
  const [currentInsight, setCurrentInsight] = useState<PortfolioInsights>({
    date: '',
    articles: [],
    swingTickers: [],
    summaries: []
  })

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('/api/portfolio')
        const data = await response.json()

        setPortfolioData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  return (
    <div className='mt-10'>
      {currentInsight.articles.length > 0 && <InsightCard insights={currentInsight} />}
      <ResponsiveContainer width='100%' height={900}>
        <LineChart
          width={730}
          height={250}
          data={portfolioData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onClick={e => {
            const { activeTooltipIndex } = e
            const currentInsight = portfolioData[activeTooltipIndex]

            setCurrentInsight({
              articles: currentInsight.articles,
              swingTickers: currentInsight.swingTickers,
              summaries: currentInsight.summaries,
              date: currentInsight.date
            })
          }}
        >
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='value' stroke='#1651d0' dot={<CustomizedDot />} strokeWidth={2.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

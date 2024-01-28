'use client'
import { useRouter } from 'next/navigation'

const stockData = [
  { name: 'AAPL', price: 150.25, checked: true, description: 'Apple Inc. - Technology company known for its electronic products and software.' },
  { name: 'GOOGL', price: 2750.8, checked: true, description: 'Alphabet Inc. (Google) - Multinational technology company specializing in internet-related services.' },
  { name: 'MSFT', price: 310.45, checked: false, description: 'Microsoft Corporation - Global technology company known for its software, hardware, and other products.' },
  { name: 'AMZN', price: 3456.12, checked: true, description: 'Amazon.com Inc. - E-commerce and cloud computing company.' },
  { name: 'TSLA', price: 800.75, checked: true, description: 'Tesla, Inc. - Electric vehicle and clean energy company.' },
  { name: 'NFLX', price: 600.5, checked: false, description: 'Netflix, Inc. - Subscription-based streaming service.' },
  { name: 'FB', price: 340.6, checked: true, description: 'Meta Platforms, Inc. (Facebook) - Social media and technology company.' }
  // Add more stocks as needed
]
export default function Home() {
  const router = useRouter()
  return (
    <>
      <main className='flex h-screen flex-col items-center justify-center'>
        <div className='w-full max-w-md space-y-2'>
          {stockData.map((stock, index) => (
            <div key={index} className='rounded overflow-hidden shadow-sm p-3  border'>
              <div className='flex items-center py-4'>
                <label className='flex items-center cursor-pointer'>
                  <input type='checkbox' checked={stock.checked} className='form-checkbox h-4 w-4 text-green-500 border-green-500 rounded-sm' />
                  <span className='ml-3 text-lg text-gray-700 font-semibold'>{stock.name}</span>
                </label>
              </div>
              <p className='text-gray-500 text-sm'>{stock.description}</p>
            </div>
          ))}
        </div>
        <button onClick={() => router.push('/insights')} className='absolute bottom-7 right-10 bg-blue-500 text-white px-4 py-1.5 rounded'>
          Next
        </button>
      </main>
    </>
  )
}

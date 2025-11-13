import { Wallet } from 'lucide-react'
import React from 'react'


const WalletBalance = () => {
  return (
  <div>
      <div className='flex flex-col items-center gap-7 bg-blue-50 p-9 border-blue-200 border-8 m-8 mt-0 ml-0'>
      <div className='flex flex-col items-center gap-2'>
        <Wallet size={60} className='text-blue-600' />
        <h1 className='text-2xl font-extralight  text-blue-400 '>Your Wallet Balance</h1>
      </div>
      <div className='font-semibold text-blue-400 flex flex-col items-center'>
        <p className='text-blue-800 text-xl'>$0.00</p>
        <p >Available</p>
      </div>
    </div>
    
    <div className='border-12 border-gray-400 p-6 space-y-5 text-blue-800'>
     <p>Minimum Recharge <span className='px-18'>:</span>  <span className='pl-25'>0</span></p>
     <p>Maximum Recharge <span className='px-17'>:</span>  <span className='pl-26'>0</span></p>
    </div>
  </div>  )
}

export default WalletBalance

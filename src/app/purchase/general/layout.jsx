import React from 'react'
import PurchaseCards from './components/PurchaseCards'
import PurchaseTable from './components/PurchaseTable'
import PurchaseWallet from './components/PurchaseWallet'


const PurchaseGeneralLayout = () => {
  return (
    <div className='m-6'>
        <div className='grid grid-cols-5 gap-5'>
     <div className='col-span-3'><PurchaseCards/></div> 
        <div className='col-span-2'><PurchaseWallet/></div> 
        </div>
   
     <PurchaseTable/>
     
    </div>
  )
}

export default PurchaseGeneralLayout

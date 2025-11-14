import React from 'react'


const PurchaseCards = () => {

  return (
    <form   className="space-y-4 ">
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label htmlFor="accountNumber" className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          PRODUCT NAME <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center">
          <select id="accountNumber" name="accountNumber" defaultValue="" className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none">
            <option value="" disabled></option>
            <option value="1001">Product- A</option>
            <option value="1002">Product- B</option>
            <option value="1002">Product- C</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">PRODUCT QUANTITY <span className="text-red-600 ml-1">*</span></label>
        <input name="amount"  className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">UNIT PRICE<span className="text-red-600 ml-1">*</span></label>
        <input name="amount" disabled placeholder='0.00 TK' className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">TOTAL PRICE<span className="text-red-600 ml-1">*</span></label>
        <input name="mobile" disabled placeholder='0.00 TK' className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">VAT AMOUNT<span className="text-red-600 ml-1">*</span></label>
        <input name="transactionId" disabled placeholder='0.00 TK' className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>


      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">PAYABLE AMOUNT<span className="text-red-600 ml-1">*</span></label>
        <input name="transactionId" disabled placeholder='0.00 TK' className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>
      <p className='text-blue-500 text-sm'>(<span className='text-red-700'>*</span>) required fields</p>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white">Save</button>
      </div>

      
    </form>
  )
}

export default  PurchaseCards
    

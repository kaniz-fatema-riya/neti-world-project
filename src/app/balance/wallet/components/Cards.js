"use client";

import { Banknote, Origami, Phone } from "lucide-react";
import React from "react";


/** ---------- Deposit Cards ---------- **/
function DepositCards({ method, setMethod }) {
  const cards = [
    { key: "bkash", label: "Existing bKash", icon: <Origami size={36} /> },
    { key: "bank", label: "Bank or Cheque", icon: <Banknote size={36} /> },
    { key: "recharge", label: "Direct Recharge", icon: <Phone size={36} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      {cards.map((card) => {
        const isActive = method === card.key;
        return (
          <button
            key={card.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => setMethod(card.key)}
            className={`w-full flex flex-col items-center justify-center rounded-2xl border shadow-sm transition-all duration-200 p-10
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:shadow-md"
              }`}
          >
            <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center ${
              isActive ? "bg-white/20" : "bg-blue-50"
            }`}>
              {card.icon}
            </div>
            <span className="font-semibold text-lg">{card.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** ---------- Bkash Form ---------- **/
function BkashForm({ data, onChange, onSubmit }) {
  return (
    <form  onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      
      <div className=" space-y-4 ">

        <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff]  overflow-hidden">

  {/* LEFT LABEL (blue box) */}
  <label
    htmlFor="accountNumber"
    className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
               text-xs font-semibold uppercase text-[#1b3b58] 
               flex items-center"
  >
    ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
  </label>

  {/* RIGHT SELECT BOX */}
  <div className="flex items-center">
    <select
      id="accountNumber"
      className="w-full px-4 py-3 text-sm text-gray-700 
                 focus:outline-none border-none"
      defaultValue=""
    >
      <option value="" className="text-sm text-gray-700" disabled>select account number</option>
      <option value="1001">1001 - Savings</option>
      <option value="1002">1002 - Current</option>
    </select>
  </div>







</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">
  
  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Deposite Amount <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    name="amount" 
    value={data.amount} 
    onChange={onChange} 
    placeholder="enter your amount" 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">

  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Deposit Date <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    type="date"
    name="date" 
    value={data.date} 
    onChange={onChange} 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>


<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">
  
  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Mobile Banking Number <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    name="amount" 
    value={data.amount} 
    onChange={onChange} 
    placeholder="enter your amount" 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">
  
  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Transaction ID <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    name="amount" 
    value={data.amount} 
    onChange={onChange} 
    placeholder="enter your amount" 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>








      </div>

      <div className="text-sm text-gray-500">( <span className="text-red-500">*</span> ) required fields</div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white">Save</button>
      </div>
    </form>
  );
}

/** ---------- Bank Form ---------- **/
function BankForm({ data, onChange, onImageChange, onSubmit }) {
  return (
    <form  onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      
      <div className=" space-y-4 ">

        <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff]  overflow-hidden">

  {/* LEFT LABEL (blue box) */}
  <label
    htmlFor="accountNumber"
    className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
               text-xs font-semibold uppercase text-[#1b3b58] 
               flex items-center"
  >
    ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
  </label>

  {/* RIGHT SELECT BOX */}
  <div className="flex items-center">
    <select
      id="accountNumber"
      className="w-full px-4 py-3 text-sm text-gray-700 
                 focus:outline-none border-none"
      defaultValue=""
    >
      <option value="" disabled>select account number</option>
      <option value="1001">1001 - Savings</option>
      <option value="1002">1002 - Current</option>
    </select>
  </div>







</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">
  
  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Deposite Amount <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    name="amount" 
    value={data.amount} 
    onChange={onChange} 
    placeholder="enter your amount" 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">

  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Deposit Date <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    type="date"
    name="date" 
    value={data.date} 
    onChange={onChange} 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">

  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Branch <span className="text-red-600 ml-1">*</span>
  </label>

  <input 
    name="branch" 
    value={data.branch} 
    onChange={onChange} 
    placeholder="enter branch name" 
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  />
</div>


<div className="grid grid-cols-[220px_1fr] w-full   rounded overflow-hidden">

  <label className="  border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Deposit Type <span className="text-red-600 ml-1">*</span>
  </label>

  <div className="px-4 py-3 flex items-center gap-6">
    <label className="flex gap-2 items-center">
      <input 
        type="radio" 
        name="depositType" 
        value="cash" 
        checked={data.depositType === "cash"} 
        onChange={onChange} 
      />
      <span>Cash</span>
    </label>

    <label className="flex gap-2 items-center">
      <input 
        type="radio" 
        name="depositType" 
        value="cheque"
        checked={data.depositType === "cheque"} 
        onChange={onChange} 
      />
      <span>Cheque</span>
    </label>
  </div>

</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">

  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Note <span className="text-red-600 ml-1">*</span>
  </label>

  <textarea 
    name="note" 
    value={data.note} 
    onChange={onChange}
    placeholder="enter deposit note"
    rows={4}
    className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
  ></textarea>

</div>

<div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] rounded overflow-hidden">

  <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 
                     text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
    Upload Image <span className="text-red-600 ml-1">*</span>
  </label>

  <label className="p-6 border-dashed border-2 border-[#cfe5ff] text-center text-gray-500 cursor-pointer">
    <input type="file" className="hidden" accept="image/*" onChange={onImageChange} />
    <p>Click / Drag Image to Upload</p>
    {data.image && <p className="mt-2 text-sm text-black">{data.image.name}</p>}
  </label>

</div>

      </div>

      <div className="text-sm text-gray-500">( <span className="text-red-500">*</span> ) required fields</div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white">Save</button>
      </div>
    </form>
    
  );
}

/** ---------- Main Page Without Wallet Balance ---------- **/
export default function Page() {
  const [method, setMethod] = React.useState("bkash");

  const [bkashData, setBkashData] = React.useState({
    accountNumber: "",
    amount: "",
    date: "",
    mobile: "",
    transactionId: "",
  });

  const [bankData, setBankData] = React.useState({
    accountNumber: "",
    amount: "",
    date: "",
    branch: "",
    depositType: "cash",
    note: "",
    image: null,
  });

  const [feedback, setFeedback] = React.useState({ type: "", message: "" });

  const validateBkash = (d) => {
    if (!d.accountNumber) return "Select account number";
    if (!d.amount || d.amount <= 0) return "Enter valid amount";
    if (!d.date) return "Select date";
    if (!d.mobile) return "Mobile number required";
    if (!d.transactionId) return "Enter transaction ID";
    return null;
  };

  const validateBank = (d) => {
    if (!d.accountNumber) return "Select account number";
    if (!d.amount || d.amount <= 0) return "Enter valid amount";
    if (!d.date) return "Select date";
    if (!d.branch) return "Enter branch name";
    if (!d.note) return "Enter a note";
    if (!d.image) return "Upload slip image";
    return null;
  };

  const submitBkash = () => {
    const err = validateBkash(bkashData);
    if (err) return setFeedback({ type: "error", message: err });
    console.log("Bkash Submitted:", bkashData);
    setFeedback({ type: "success", message: "Bkash submitted!" });
  };

  const submitBank = () => {
    const err = validateBank(bankData);
    if (err) return setFeedback({ type: "error", message: err });
    console.log("Bank Submitted:", bankData);
    setFeedback({ type: "success", message: "Bank transaction submitted!" });
  };

  return (
    <div className="min-h-screen bg-white ">
      

      <DepositCards method={method} setMethod={setMethod} />

      {feedback.message && (
        <div className={`my-4 p-3 rounded ${
          feedback.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
        }`}>
          {feedback.message}
        </div>
      )}

      <div className="mt-10 bg-white  ">
        {method === "bkash" ? (
          <BkashForm
            data={bkashData}
            onChange={(e) => setBkashData({ ...bkashData, [e.target.name]: e.target.value })}
            onSubmit={submitBkash}
          />
        ) : method === "bank" ? (
          <BankForm
            data={bankData}
            onChange={(e) => setBankData({ ...bankData, [e.target.name]: e.target.value })}
            onImageChange={(e) => setBankData({ ...bankData, image: e.target.files?.[0] ?? null })}
            onSubmit={submitBank}
          />
        ) : (
          <div className="p-4 text-gray-600">Direct Recharge — coming soon</div>
        )}
      </div>
    </div>
  );
}

/* ---------- Tailwind Helper Classes ---------- */
const sharedStyles = `
  .input { @apply w-full px-4 py-3 border border-gray-300 rounded text-sm; }
  .label { @apply bg-blue-50 px-4 py-3 text-xs font-semibold uppercase text-slate-700 rounded-sm; }
  .btn-primary { @apply bg-blue-600 text-white px-6 py-3 rounded-lg shadow; }
`;

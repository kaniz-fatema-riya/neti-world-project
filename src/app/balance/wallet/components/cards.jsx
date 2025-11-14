"use client";

import React from "react";
import { Banknote, Origami, Phone } from "lucide-react";

/** Deposit cards  **/
function DepositCards({ method, setMethod }) {
  const cards = [
    { key: "bkash", label: "Existing bKash", icon: <Origami size={36} /> },
    { key: "bank", label: "Bank or Cheque", icon: <Banknote size={36} /> },
    { key: "recharge", label: "Direct Recharge", icon: <Phone size={36} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
      {cards.map((card) => {
        const isActive = method === card.key;
        return (
          <button
            key={card.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              console.log("Clicked:", card.key);
              setMethod(card.key);
            }}
            className={`w-full flex flex-col items-center justify-center rounded-2xl border shadow-sm transition-all duration-200 p-8
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:shadow-md"
              }`}
          >
            <div
              className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center ${
                isActive ? "bg-white/20" : "bg-blue-50"
              }`}
            >
              {card.icon}
            </div>
            <span className="font-semibold text-lg">{card.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Bkash form (uncontrolled) **/
function BkashForm({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label
          htmlFor="accountNumber"
          className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center"
        >
          ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center">
          <select
            id="accountNumber"
            name="accountNumber"
            defaultValue=""
            className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none"
          >
            <option value="" disabled>
              select account number
            </option>
            <option value="1001">1001 - Savings</option>
            <option value="1002">1002 - Current</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposite Amount <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          name="amount"
          placeholder="enter your amount"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Date <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          type="date"
          name="date"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Mobile Banking Number <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          name="mobile"
          placeholder="enter your mobile number"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Transaction ID <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          name="transactionId"
          placeholder="enter your transaction id"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}

/** Bank form  **/
function BankForm({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label
          htmlFor="accountNumberBank"
          className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center"
        >
          ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center">
          <select
            id="accountNumberBank"
            name="accountNumber"
            defaultValue=""
            className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none"
          >
            <option value="" disabled>
              select account number
            </option>
            <option value="1001">1001 - Savings</option>
            <option value="1002">1002 - Current</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposite Amount <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          name="amount"
          placeholder="enter your amount"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Date <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          type="date"
          name="date"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Branch <span className="text-red-600 ml-1">*</span>
        </label>
        <input
          name="branch"
          placeholder="enter branch name"
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full overflow-hidden">
        <label className="px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Type <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="px-4 py-3 flex items-center gap-6">
          <label className="flex gap-2 items-center">
            <input type="radio" name="depositType" value="cash" />{" "}
            <span>Cash</span>
          </label>
          <label className="flex gap-2 items-center">
            <input type="radio" name="depositType" value="cheque" />{" "}
            <span>Cheque</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Note <span className="text-red-600 ml-1">*</span>
        </label>
        <textarea
          name="note"
          rows={4}
          className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          placeholder="enter deposit note"
        ></textarea>
      </div>

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Upload Image <span className="text-red-600 ml-1">*</span>
        </label>
        <label className="p-6 border-dashed border-2 border-[#cfe5ff] text-center text-gray-500 cursor-pointer">
          <input type="file" name="image" className="hidden" accept="image/*" />
          <p>Click / Drag Image to Upload</p>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}

/** WalletForms **/
export default function WalletForms({
  method,
  setMethod,
  onSubmitBkash,
  onSubmitBank,
  feedback,
}) {
  return (
    <div className="bg-white">
      <DepositCards method={method} setMethod={setMethod} />

      {feedback?.message && (
        <div
          className={`my-4 p-3 rounded ${
            feedback.type === "error"
              ? "bg-red-50 text-red-800"
              : "bg-green-50 text-green-800"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="mt-6 bg-white">
        {method === "bkash" && <BkashForm onSubmit={onSubmitBkash} />}
        {method === "bank" && <BankForm onSubmit={onSubmitBank} />}
        {method === "recharge" && (
          <div className="p-4 text-gray-600">Direct Recharge — coming soon</div>
        )}
      </div>
    </div>
  );
}

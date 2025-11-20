"use client";

import React, { useEffect, useState } from "react";
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
            onClick={() => setMethod(card.key)}
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

/** small helpers **/
const isEmpty = (v) => v === null || v === undefined || String(v).trim() === "";
const isPositiveNumber = (v) => {
  const n = Number(v);
  return !Number.isNaN(n) && Number.isFinite(n) && n > 0;
};

/** Bkash form (controlled + validation) **/
function BkashForm({ onSubmit }) {
  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
    date: "",
    mobile: "",
    transactionId: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "accountNumber":
        return isEmpty(value) ? "Please select an account." : "";
      case "amount":
        if (isEmpty(value)) return "Amount is required.";
        return isPositiveNumber(value) ? "" : "Enter a valid amount (> 0).";
      case "date":
        return isEmpty(value) ? "Deposit date is required." : "";
      case "mobile":
        if (isEmpty(value)) return "Mobile number is required.";
        if (!/^\+?\d{7,15}$/.test(value.trim())) return "Enter a valid phone number.";
        return "";
      case "transactionId":
        return isEmpty(value) ? "Transaction ID is required." : "";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const next = {};
    Object.keys(form).forEach((k) => {
      const err = validateField(k, form[k]);
      if (err) next[k] = err;
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const err = validateField(name, form[name]);
    setErrors((p) => ({ ...p, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ensure no native submit/reload
    const next = validateAll();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (typeof onSubmit === "function") onSubmit({ ...form });
    setForm({
      accountNumber: "",
      amount: "",
      date: "",
      mobile: "",
      transactionId: "",
    });
    setErrors({});
  };

  return (
    // <-- noValidate prevents browser native validation popups/messages
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label htmlFor="accountNumber" className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <select
            id="accountNumber"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none"
          >
            <option value="">select account number</option>
            <option value="1001">1001 - Savings</option>
            <option value="1002">1002 - Current</option>
          </select>
        </div>
      </div>
      {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposite Amount <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your amount"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Date <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            onBlur={handleBlur}
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Mobile Banking Number <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your mobile number"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Transaction ID <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="transactionId"
            value={form.transactionId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your transaction id"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {errors.transactionId && <p className="text-red-500 text-xs mt-1">{errors.transactionId}</p>}

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

/** Bank form (controlled + image upload + validation) **/
function BankForm({ onSubmit }) {
  const [form, setForm] = useState({
    accountNumber: "",
    amount: "",
    date: "",
    branch: "",
    depositType: "",
    note: "",
    imageFile: null,
    imageName: "",
    imagePreviewUrl: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      if (form.imagePreviewUrl) URL.revokeObjectURL(form.imagePreviewUrl);
    };
  }, [form.imagePreviewUrl]);

  const validateField = (name, value) => {
    switch (name) {
      case "accountNumber":
        return isEmpty(value) ? "Please select an account." : "";
      case "amount":
        if (isEmpty(value)) return "Amount is required.";
        return isPositiveNumber(value) ? "" : "Enter a valid amount (> 0).";
      case "date":
        return isEmpty(value) ? "Deposit date is required." : "";
      case "branch":
        return isEmpty(value) ? "Branch is required." : "";
      case "depositType":
        return isEmpty(value) ? "Deposit type is required." : "";
      case "note":
        return isEmpty(value) ? "Note is required." : "";
      case "imageFile":
        return value ? "" : "Image file is required.";
      default:
        return "";
    }
  };

  const validateAll = () => {
    const keys = ["accountNumber", "amount", "date", "branch", "depositType", "note", "imageFile"];
    const next = {};
    keys.forEach((k) => {
      const val = k === "imageFile" ? form.imageFile : form[k];
      const err = validateField(k, val);
      if (err) next[k] = err;
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files?.[0] ?? null;
      if (form.imagePreviewUrl) URL.revokeObjectURL(form.imagePreviewUrl);
      if (file) {
        const preview = URL.createObjectURL(file);
        setForm((p) => ({
          ...p,
          imageFile: file,
          imageName: file.name,
          imagePreviewUrl: preview,
        }));
        setErrors((p) => ({ ...p, imageFile: "" }));
      } else {
        setForm((p) => ({ ...p, imageFile: null, imageName: "", imagePreviewUrl: "" }));
      }
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const key = name === "image" ? "imageFile" : name;
    const val = key === "imageFile" ? form.imageFile : form[name];
    const err = validateField(key, val);
    setErrors((p) => ({ ...p, [key]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop native submit/reload
    const next = validateAll();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const payload = {
      accountNumber: form.accountNumber,
      amount: form.amount,
      date: form.date,
      branch: form.branch,
      depositType: form.depositType,
      note: form.note,
      imageName: form.imageName,
      imageFile: form.imageFile,
    };

    if (typeof onSubmit === "function") onSubmit(payload);

    if (form.imagePreviewUrl) URL.revokeObjectURL(form.imagePreviewUrl);
    setForm({
      accountNumber: "",
      amount: "",
      date: "",
      branch: "",
      depositType: "",
      note: "",
      imageFile: null,
      imageName: "",
      imagePreviewUrl: "",
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label htmlFor="accountNumberBank" className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          ACCOUNT NUMBER <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <select
            id="accountNumberBank"
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none"
          >
            <option value="">select account number</option>
            <option value="1001">1001 - Savings</option>
            <option value="1002">1002 - Current</option>
          </select>
        </div>
      </div>
          {errors.accountNumber && <p className="text-red-500 text-xs  mt-1">{errors.accountNumber}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposite Amount <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter your amount"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
          {errors.amount && <p className="text-red-500 text-xs  mt-1">{errors.amount}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Date <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            onBlur={handleBlur}
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
          {errors.date && <p className="text-red-500 text-xs  mt-1">{errors.date}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Branch <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="branch"
            value={form.branch}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="enter branch name"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>
          {errors.branch && <p className="text-red-500 text-xs  mt-1">{errors.branch}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full overflow-hidden">
        <label className="px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Deposit Type <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="px-4 py-3 flex items-center gap-6">
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              name="depositType"
              value="cash"
              checked={form.depositType === "cash"}
              onChange={handleChange}
            />{" "}
            <span>Cash</span>
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              name="depositType"
              value="cheque"
              checked={form.depositType === "cheque"}
              onChange={handleChange}
            />{" "}
            <span>Cheque</span>
          </label>
        </div>
      </div>
        {errors.depositType && <p className="text-red-500 text-xs  mt-1 col-start-2">{errors.depositType}</p>}

      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Note <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <textarea
            name="note"
            rows={4}
            value={form.note}
            onChange={handleChange}
            onBlur={handleBlur}
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
            placeholder="enter deposit note"
          />
        </div>
      </div>
          {errors.note && <p className="text-red-500 text-xs  mt-1">{errors.note}</p>}

      {/* Upload image with filename + preview + per-field error */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Upload Image <span className="text-red-600 ml-1">*</span>
        </label>

        <div className="flex flex-col p-0">
          <label
            htmlFor="bank-image"
            className="p-6 border-dashed border-2 border-[#cfe5ff] text-center text-gray-500 cursor-pointer relative flex flex-col items-center gap-3"
          >
            <input
              id="bank-image"
              type="file"
              name="image"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <p className="file-text text-sm">
              {form.imageName ? form.imageName : "Click / Drag Image to Upload"}
            </p>

            {form.imagePreviewUrl && (
              <img
                src={form.imagePreviewUrl}
                alt={form.imageName}
                className="max-h-28 max-w-full object-contain rounded shadow-sm"
              />
            )}
          </label>

          
        </div>
      </div>
      {errors.imageFile && <p className="text-red-500 text-xs  mt-1">{errors.imageFile}</p>}

      <div className="flex justify-end">
        <button  type="submit" className="bg-blue-600 px-5 rounded-lg py-2 hover:bg-blue-700 text-white">
          Save
        </button>
      </div>
    </form>
  );
}

/** WalletForms **/
export default function WalletForms({ method, setMethod, onSubmitBkash, onSubmitBank, feedback }) {
  return (
    <div className="bg-white">
      <DepositCards method={method} setMethod={setMethod} />

      {feedback?.message && (
        <div className={`my-4 p-3 rounded ${feedback.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
          {feedback.message}
        </div>
      )}

      <div className="mt-6 bg-white">
        {method === "bkash" && <BkashForm onSubmit={onSubmitBkash} />}
        {method === "bank" && <BankForm onSubmit={onSubmitBank} />}
        {method === "recharge" && <div className="p-4 text-gray-600">Direct Recharge — coming soon</div>}
      </div>
    </div>
  );
}

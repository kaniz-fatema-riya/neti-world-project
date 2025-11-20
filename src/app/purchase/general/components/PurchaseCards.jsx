"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";

const empty = {
  date: "",
  purchasePoint: "",
  invoiceId: "",
  productName: "",
  quantity: "",
  paidAmount: "",
  purchaseCode: "",
};

const PurchaseCards = ({ onAdd }) => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "productName":
        if (!value || value === "") return "Product is required.";
        return "";
      case "quantity": {
        if (value === "" || value === null || value === undefined) return "Quantity is required.";
        const n = Number(value);
        if (!Number.isFinite(n) || isNaN(n)) return "Quantity must be a number.";
        if (!Number.isInteger(n)) return "Quantity must be an integer.";
        if (n < 1) return "Quantity must be at least 1.";
        return "";
      }
      default:
        return "";
    }
  };

  const validateAll = (data) => {
    const next = {};
    next.productName = validateField("productName", data.productName);
    next.quantity = validateField("quantity", data.quantity);
    // If you want other fields validated later, add here.
    // Remove empty messages:
    Object.keys(next).forEach((k) => {
      if (!next[k]) delete next[k];
    });
    return next;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    // keep value as string for controlled inputs; quantity will be validated/cast when needed
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear error for this field while user types (optional)
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validateAll(form);
    setErrors(nextErrors);

    // if any errors exist, stop submit
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (typeof onAdd === "function") {
      // coerce quantity to integer
      const quantity = parseInt(form.quantity, 10) || 1;
      onAdd({
        productName: form.productName,
        quantity,
        purchaseCode: form.purchaseCode || "",
      });
    }

    // reset form and errors
    setForm(empty);
    setErrors({});
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Product Name */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label htmlFor="productName" className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          PRODUCT NAME <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <select
            id="productName"
            name="productName"
            value={form.productName}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none border-none"
          >
            <option value="" disabled>
              -- Select product --
            </option>
            <option value="Product-A">Product-A</option>
            <option value="Product-B">Product-B</option>
            <option value="Product-C">Product-C</option>
          </select>
         
        </div>
      </div>
       {errors.productName && (
            <p className="text-red-500 text-sm mt-1 ">{errors.productName}</p>
          )}

      {/* Product Quantity */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">
          Product Quantity <span className="text-red-600 ml-1">*</span>
        </label>
        <div className="flex flex-col w-full">
          <input
            name="quantity"
            value={form.quantity}
            onChange={onChange}
            onBlur={onBlur}
            type="number"
            min="1"
            className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
          />
        
        </div>
      </div>
        {errors.quantity && (
            <p className="text-red-500 text-sm mt-1 ">{errors.quantity}</p>
          )}

      {/* Unit Price */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">UNIT PRICE <span className="text-red-600 ml-1">*</span></label>
        <input disabled placeholder="0.00TK"
               className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      {/* Total Price */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">TOTAL PRICE <span className="text-red-600 ml-1">*</span></label>
        <input disabled placeholder="0.00TK"
               className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      {/* VAT Amount */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">VAT AMOUNT <span className="text-red-600 ml-1">*</span></label>
        <input disabled placeholder="0.00TK"
               className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      {/* Payable Amount */}
      <div className="grid grid-cols-[220px_1fr] w-full border border-[#cfe5ff] overflow-hidden">
        <label className="bg-[#eaf6ff] border-r  border-[#cfe5ff] px-4 py-3 text-xs font-semibold uppercase text-[#1b3b58] flex items-center">PAYABLE AMOUNT <span className="text-red-600 ml-1">*</span></label>
        <input disabled placeholder="0.00TK"
               className="px-4 py-3 w-full text-sm text-gray-700 focus:outline-none" />
      </div>

      <div className="flex justify-between gap-3 mt-2">
        <p className="text-sm">(<span className="text-red-600">*</span>) fields are required to fill. </p>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
};

PurchaseCards.propTypes = {
  onAdd: PropTypes.func,
};

PurchaseCards.defaultProps = {
  onAdd: () => {},
};

export default PurchaseCards;

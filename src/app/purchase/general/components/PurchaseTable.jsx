"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import PropTypes from "prop-types";

/**
 * PurchaseTable
 * Accepts `data` array and optional onRemove(id) callback.
 */

const initialFilters = {
  date: "",
  purchasePoint: "",
  invoiceId: "",
  productName: "",
  quantity: "",
  paidAmount: "",
  purchaseCode: "",
};

const normalizeVal = (v) =>
  v === null || v === undefined ? "" : String(v).toLowerCase();

const PurchaseTable = ({ data, onRemove }) => {
  // normalise incoming data
  const rows = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  // FIXED: initialize with object, not empty string
  const [filters, setFilters] = useState(initialFilters);

  const onFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  // apply filters: every non-empty filter must match substring (case-insensitive)
  const filteredRows = useMemo(() => {
    const activeKeys = Object.keys(filters).filter((k) => filters[k].trim() !== "");
    if (activeKeys.length === 0) return rows;

    return rows.filter((row) =>
      activeKeys.every((key) => {
        const filterVal = filters[key].trim().toLowerCase();
        const rowVal = normalizeVal(row[key]);
        return rowVal.includes(filterVal);
      })
    );
  }, [rows, filters]);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  // close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mb-10">
      <div className="w-full border border-[#cfe5ff] overflow-hidden mt-6">
        {/* Header bar */}
        <div className="bg-[#6879A1] text-white flex justify-between items-center px-4 py-2">
          <h2 className="font-semibold text-sm">Product Purchase List</h2>
          <button
            type="button"
            className="flex items-center gap-2 bg-[#55658A] px-4 py-2 text-white text-sm"
          >
            More <span className="text-white">➤</span>
          </button>
        </div>

        {/* Label row + inputs row (grid with 12 columns) */}
        <div className="grid grid-cols-12 bg-white border-b border-[#cfe5ff] text-sm text-[#1b3b58]">
          {/* Date & Time (col-span-1) */}
          <div className="col-span-1 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Date &amp; Time</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.date}
              onChange={(e) => onFilterChange("date", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Purchase Point (col-span-2) */}
          <div className="col-span-2 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Purchase Point</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.purchasePoint}
              onChange={(e) => onFilterChange("purchasePoint", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Invoice ID (col-span-2) */}
          <div className="col-span-2 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Invoice ID</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.invoiceId}
              onChange={(e) => onFilterChange("invoiceId", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Product Name (col-span-2) */}
          <div className="col-span-2 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Product Name</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.productName}
              onChange={(e) => onFilterChange("productName", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Product Quantity (col-span-2) */}
          <div className="col-span-2 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Product Quantity</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.quantity}
              onChange={(e) => onFilterChange("quantity", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Paid Amount (with VAT) (col-span-2) */}
          <div className="col-span-2 border-r border-[#e3f0ff] px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs">Paid Amount (with VAT)</span>
              <ArrowUpDown size={14} />
            </div>
            <input
              value={filters.paidAmount}
              onChange={(e) => onFilterChange("paidAmount", e.target.value)}
              type="text"
              className="mt-2 border border-blue-200 rounded px-2 py-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>

          {/* Purchase Code (col-span-1) */}
          <div className="col-span-1 px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs leading-tight">
                Purchase
                <br />
                Code
              </span>
            </div>
          </div>
        </div>

        {/* Rows / Empty state */}
        {filteredRows.length === 0 ? (
          <div className="bg-[#e9f5ff] px-4 py-6 text-sm text-gray-500">No submissions yet.</div>
        ) : (
          filteredRows.map((row, idx) => (
            <div
              key={row.id ?? `row-${idx}`}
              className={
                "grid grid-cols-12 border-b border-[#e3f0ff] text-sm text-[#1b3b58] bg-white/70 hover:bg-white"
              }
            >
              {/* Date & Time */}
              <div className="col-span-1 border-[#cfe5ff]  px-4 py-3 border-r">
                <div className="text-xs">{new Date().toLocaleString()}</div>
              </div>

              {/* Purchase Point */}
              <div className="col-span-2 border-[#cfe5ff]  px-4 py-3 border-r">
                <div className="text-sm">{row.purchasePoint ?? 1400}</div>
              </div>

              {/* Invoice ID */}
              <div className="col-span-2 border-[#cfe5ff]  px-4 py-3 border-r">
                <div className="text-sm">{row.invoiceId ?? `B127${Math.round(Math.random())}`}</div>
              </div>

              {/* Product Name */}
              <div className="col-span-2 border-[#cfe5ff]  px-4 py-3 border-r">
                <div className="text-sm">{row.productName ?? "-"}</div>
              </div>

              {/* Product Quantity */}
              <div className="col-span-2 border-[#cfe5ff]  px-4 py-3 border-r text-center">{row.quantity ?? "-"}</div>

              {/* Paid Amount (with VAT) */}
              <div className="col-span-2 px-4 py-3 border-r border-[#cfe5ff] text-right">{row.paidAmount ?? "-"}</div>

              {/* Purchase Code */}
              <div className="col-span-1 px-4 py-3 text-center">
                <div className="inline-flex items-center gap-2">
                  {/* info button — now opens modal with details */}
                  <button
                    type="button"
                    onClick={() => openModal(row)}
                    className="ml-1 w-6 h-6 rounded bg-[#eaf6ff] text-[#1b3b58] flex items-center justify-center text-xs"
                    title="Details"
                  >
                    i
                  </button>

               
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal (renders when showModal === true) */}
      {showModal && selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />

          {/* panel */}
          <div className="relative bg-white rounded-lg shadow-xl w-[min(720px,95%)] max-h-[90vh] overflow-auto p-6 z-10">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold">Product details</h4>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-[#1b3b58]">
              <div>
                <div className="text-xs text-gray-500">Product</div>
                <div className="mt-1">{selectedRow.productName ?? "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Quantity</div>
                <div className="mt-1">{selectedRow.quantity ?? "-"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Purchase Code</div>
                <div className="mt-1">{selectedRow.purchaseCode ?? "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Invoice ID</div>
                <div className="mt-1">{selectedRow.invoiceId ?? "-"}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Paid amount</div>
                <div className="mt-1">{selectedRow.paidAmount ?? "-"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Date</div>
                <div className="mt-1">{selectedRow.date ?? "-"}</div>
              </div>
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
};

PurchaseTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]),
  onRemove: PropTypes.func,
};

PurchaseTable.defaultProps = {
  data: [],
  onRemove: null,
};

export default PurchaseTable;

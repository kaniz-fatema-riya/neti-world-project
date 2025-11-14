import React from "react";

const Table = ({ data }) => {
  // normalize data: accept single object or array
  const rows = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="mb-10 px-5">
      <div className="w-full border border-[#cfe5ff] overflow-hidden mt-6">
        <div className="bg-[#6879A1] text-white flex justify-between items-center px-4 py-3">
          <h2 className="font-semibold text-sm">Balance Deposit List</h2>
          <button
            type="button"
            className="flex items-center gap-2 bg-[#55658A] px-4 py-2 rounded text-white text-sm"
          >
            More <span className="text-white">➤</span>
          </button>
        </div>

        <div className="grid grid-cols-6 bg-white border-b border-[#cfe5ff] text-sm font-semibold text-[#1b3b58]">
          <div className="px-4 py-3 border-r border-[#e3f0ff]">
            Request Date
          </div>
          <div className="px-4 py-3 border-r border-[#e3f0ff]">Bank</div>
          <div className="px-4 py-3 border-r border-[#e3f0ff]">
            Account Number
          </div>
          <div className="px-4 py-3 border-r border-[#e3f0ff] flex items-center gap-1">
            Request Amount <span className="text-gray-400">⇅</span>
          </div>
          <div className="px-4 py-3 border-r border-[#e3f0ff]">Status</div>
          <div className="px-4 py-3">Details</div>
        </div>

        {rows.length === 0 ? (
          <div className="bg-[#e9f5ff] px-4 py-6 text-sm text-gray-500">
            No submissions yet.
          </div>
        ) : (
          rows.map((row, idx) => (
            <div
              key={row.id ?? `row-${idx}`}
              className="grid grid-cols-6 border-b border-[#e3f0ff] text-sm text-[#1b3b58]"
            >
              <div className="px-4 py-3 border-r">{row.date || "-"}</div>
              <div className="px-4 py-3 border-r">
                {row.type === "bkash" ? "bKash" : row.branch || "Bank"}
              </div>
              <div className="px-4 py-3 border-r">
                {row.accountNumber || "-"}
              </div>
              <div className="px-4 py-3 border-r">{row.amount || "-"}</div>
              <div className="px-4 py-3 border-r">{row.status || "-"}</div>
              <div className="px-4 py-3">
                {row.type === "bkash" ? (
                  <>
                    <div className="text-xs text-gray-600">
                      Mobile: {row.mobile || "-"}
                    </div>
                    <div className="text-xs text-gray-600">
                      Txn: {row.transactionId || "-"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-600">
                      Type: {row.depositType || "-"}
                    </div>
                    <div className="text-xs text-gray-600">
                      Note: {row.note || "-"}
                    </div>
                    {row.image && (
                      <div className="text-xs text-gray-600">
                        Image: {row.image.name}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;

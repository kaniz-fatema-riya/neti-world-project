"use client";

import React from "react";
import WalletForms from "./components/cards";
import Table from "./components/Table";
import WalletBalance from "./components/WalletBalance";

export default function WalletPage() {
  const [method, setMethod] = React.useState("bkash");
  const [tableData, setTableData] = React.useState([]);
  const [feedback, setFeedback] = React.useState({ type: "", message: "" });

  const validateBkash = (d) => {
    if (!d.accountNumber) return "Select account number";
    if (!d.amount || Number(d.amount) <= 0) return "Enter valid amount";
    if (!d.date) return "Select date";
    if (!d.mobile) return "Mobile number required";
    if (!d.transactionId) return "Enter transaction ID";
    return null;
  };

  const validateBank = (d) => {
    if (!d.accountNumber) return "Select account number";
    if (!d.amount || Number(d.amount) <= 0) return "Enter valid amount";
    if (!d.date) return "Select date";
    if (!d.branch) return "Enter branch name";
    if (!d.note) return "Enter a note";
    if (!d.image) return "Upload slip image";
    return null;
  };

  // receive payload object from child (not a DOM event)
const submitBkash = (payloadFromChild) => {
  // payloadFromChild already contains the form fields from the BkashForm
  const payload = {
    id: Date.now(),
    type: "bkash",
    accountNumber: payloadFromChild.accountNumber || "",
    amount: payloadFromChild.amount || "",
    date: payloadFromChild.date || "",
    mobile: payloadFromChild.mobile || "",
    transactionId: payloadFromChild.transactionId || "",
    status: "Pending",
  };

  // optional: server-side validation or client validation here
  // const err = validateBkash(payload);
  // if (err) { setFeedback({ type: "error", message: err }); return; }

  setTableData((prev) => [...prev, payload]);
  
};

const submitBank = (payloadFromChild) => {
  // child sent plain object; if you want file upload, change form to send FormData or handle upload separately
  const payload = {
    id: Date.now(),
    type: "bank",
    accountNumber: payloadFromChild.accountNumber || "",
    amount: payloadFromChild.amount || "",
    date: payloadFromChild.date || "",
    branch: payloadFromChild.branch || "",
    depositType: payloadFromChild.depositType || "",
    note: payloadFromChild.note || "",
    image: payloadFromChild.image || null, // if child sent a File, keep it
    status: "Pending",
  };

  // const err = validateBank(payload);
  // if (err) { setFeedback({ type: "error", message: err }); return; }

  setTableData((prev) => [...prev, payload]);
  
};


  return (
    <div className="w-full">
      {/* Forms in narrow container */}
      <div className="grid grid-cols-5  px-7 gap-7">
        <div className="col-span-3">
          <WalletForms
            method={method}
            setMethod={setMethod}
            onSubmitBkash={submitBkash}
            onSubmitBank={submitBank}
            feedback={feedback}
          />{" "}
        </div>

        <div className="col-span-2">
          <WalletBalance />
        </div>
      </div>

      {/* Table full width below */}
      <div className="w-full mt-8 px-3">
        <Table data={tableData} />
      </div>
    </div>
  );
}

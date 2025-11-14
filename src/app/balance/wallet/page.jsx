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

  const submitBkash = (e) => {
    const form = new FormData(e.target);
    const payload = {
      id: Date.now(),
      type: "bkash",
      accountNumber: form.get("accountNumber") || "",
      amount: form.get("amount") || "",
      date: form.get("date") || "",
      mobile: form.get("mobile") || "",
      transactionId: form.get("transactionId") || "",
      status: "Pending",
    };

    const err = validateBkash(payload);
    if (err) {
      setFeedback({ type: "error", message: err });
      return;
    }

    setTableData((prev) => [...prev, payload]);
    setFeedback({ type: "success", message: "Bkash submitted!" });
    e.target.reset();
  };

  const submitBank = (e) => {
    const form = new FormData(e.target);
    const file = form.get("image");
    const payload = {
      id: Date.now(),
      type: "bank",
      accountNumber: form.get("accountNumber") || "",
      amount: form.get("amount") || "",
      date: form.get("date") || "",
      branch: form.get("branch") || "",
      depositType: form.get("depositType") || "",
      note: form.get("note") || "",
      image: file instanceof File ? file : null,
      status: "Pending",
    };

    const err = validateBank(payload);
    if (err) {
      setFeedback({ type: "error", message: err });
      return;
    }

    setTableData((prev) => [...prev, payload]);
    setFeedback({ type: "success", message: "Bank transaction submitted!" });
    e.target.reset();
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

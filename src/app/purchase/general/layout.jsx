"use client";
import React, { useState } from "react";
import PurchaseCards from "./components/PurchaseCards";
import PurchaseTable from "./components/PurchaseTable";
import PurchaseWallet from "./components/PurchaseWallet";

const PurchaseGeneralLayout = () => {
  // purchases live here
  const [purchases, setPurchases] = useState([]);

  // called by PurchaseCards (prop name: onAdd)
  const handleAdd = (purchaseData) => {
    setPurchases((prev) => [
      {
        id: Date.now(), // simple unique id
        ...purchaseData,
      },
      ...prev,
    ]);
  };

  // optional: delete function if you want later
  const handleRemove = (id) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="m-6">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          {/* pass the callback named `onAdd` (PurchaseCards expects onAdd) */}
          <PurchaseCards onAdd={handleAdd} />
        </div>

        <div className="col-span-2">
          <PurchaseWallet />
        </div>
      </div>

      {/* pass purchases array to the table */}
      <PurchaseTable data={purchases}  />
    </div>
  );
};

export default PurchaseGeneralLayout;

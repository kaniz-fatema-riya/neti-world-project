import { Wallet } from "lucide-react";
import React from "react";

const PurchaseWallet = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-7 bg-blue-50 p-9 border-blue-200 border-8 m-8 mt-0 ml-0">
        <div className="flex flex-col items-center gap-2">
          <Wallet size={60} className="text-blue-600" />
          <h1 className="text-2xl font-extralight  text-blue-400 ">
            Your Wallet Balance
          </h1>
        </div>
        <div className="font-semibold text-blue-400 flex flex-col items-center">
          <p className="text-blue-800 text-xl">$0.00</p>
          <p>Available</p>
        </div>
      </div>


      <div className="flex flex-col items-center gap-7 bg-pink-50 p-9 border-pink-200 border-8 m-8 mt-0 ml-0 w-9/12">
        <div className="flex flex-col items-center gap-2">
          <Wallet size={60} className="text-pink-400" />
          <h1 className="text-2xl text-center font-extralight  text-pink-400 ">
            Today's Purchase Amount
          </h1>
        </div>
        <div className="font-semibold text-pink-400 flex flex-col items-center">
          <p className="text-pink-800 text-xl">$0.00</p>
          
        </div>
      </div>

   
    </div>
  );
};

export default PurchaseWallet;


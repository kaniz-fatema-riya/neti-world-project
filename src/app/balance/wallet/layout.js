import DepositCards from "./components/Cards";
import WalletBalance from "./components/WalletBalance";
export default function WalletLayout({ children }) {
  return (
    <section className="p-4 bg-white grid grid-cols-5 gap-7  ">
     
      <div className="col-span-3"><DepositCards /></div>
      <div className="col-span-2"><WalletBalance/></div>
      
    
    </section>
  );
}
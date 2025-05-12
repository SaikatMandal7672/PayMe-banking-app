import React from "react";
import { AddMoneyCard } from "../_components/AddMoneyCard";
import BalanceCard from "../_components/BalanceCard";
import OnRampTransaction from "../_components/OnRampTransaction";

const Trasfer = () => {
  return (
    <div className="w-full min-h-screen  px-10 py-5">
      <h1 className="text-4xl  font-bold text-magnolia-900 mb-8">Transfer</h1>
      <div className="grid md:grid-cols-2  grid-cols-1 w-full bg-amber-200 mb-4 gap-8">
        <AddMoneyCard />
        <BalanceCard amount={100000} locked={0} />
      </div>
      <OnRampTransaction />
    </div>
  );
};

export default Trasfer;

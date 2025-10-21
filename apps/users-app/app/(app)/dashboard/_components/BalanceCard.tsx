
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface BalanceCardProps {
  amount: number;
  locked: number;
}
const BalanceCard = ({ amount = 10000, locked = 0 }: BalanceCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-magnolia-800 to-magnolia-500 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl md:text-5xl  font-medium text-magnolia-50">
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent className=" h-full flex flex-col justify-between text-md md:text-lg">
        <div className="flex justify-between border-b border-slate-300 pb-2">
          <div>Unlocked balance</div>
          <div>{amount / 100} INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Locked Balance</div>
          <div>{locked / 100} INR</div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div>Total Balance</div>
          <div>{(locked + amount) / 100} INR</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

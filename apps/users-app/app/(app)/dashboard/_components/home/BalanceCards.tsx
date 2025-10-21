import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, Activity } from "lucide-react";

interface BalanceCardsProps {
  totalBalance: number;
  unlockedBalance: number;
  lockedBalance: number;
}

export const BalanceCards = ({
  totalBalance,
  unlockedBalance,
  lockedBalance,
}: BalanceCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-magnolia-800 to-magnolia-600 text-white border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
            <Wallet className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl md:text-4xl font-bold mb-1">
            ₹{(totalBalance / 100).toLocaleString("en-IN")}
          </div>
          <p className="text-sm opacity-90">Available funds</p>
        </CardContent>
      </Card>

      {/* Unlocked Balance Card */}
      <Card className="bg-gradient-to-br from-green-600 to-green-500 text-white border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Unlocked Balance
            </CardTitle>
            <TrendingUp className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl md:text-4xl font-bold mb-1">
            ₹{(unlockedBalance / 100).toLocaleString("en-IN")}
          </div>
          <p className="text-sm opacity-90">Ready to use</p>
        </CardContent>
      </Card>

      {/* Locked Balance Card */}
      <Card className="bg-gradient-to-br from-orange-600 to-orange-500 text-white border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Locked Balance
            </CardTitle>
            <Activity className="h-5 w-5 opacity-80" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl md:text-4xl font-bold mb-1">
            ₹{(lockedBalance / 100).toLocaleString("en-IN")}
          </div>
          <p className="text-sm opacity-90">In processing</p>
        </CardContent>
      </Card>
    </div>
  );
};


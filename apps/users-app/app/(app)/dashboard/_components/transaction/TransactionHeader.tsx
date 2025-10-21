import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, Activity, TrendingUp } from "lucide-react";

interface TransactionHeaderProps {
  totalTransactions: number;
  totalSent: number;
  totalReceived: number;
  totalDeposits: number;
}

export const TransactionHeader = ({
  totalTransactions,
  totalSent,
  totalReceived,
  totalDeposits,
}: TransactionHeaderProps) => {
  const stats = [
    {
      label: "Total Transactions",
      value: totalTransactions,
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Money Sent",
      value: `₹${(totalSent / 100).toLocaleString("en-IN")}`,
      icon: ArrowUpRight,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Money Received",
      value: `₹${(totalReceived / 100).toLocaleString("en-IN")}`,
      icon: ArrowDownLeft,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Bank Deposits",
      value: `₹${(totalDeposits / 100).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">Transactions</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};


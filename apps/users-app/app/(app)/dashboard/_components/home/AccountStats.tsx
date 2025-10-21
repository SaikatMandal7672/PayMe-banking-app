import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface AccountStatsProps {
  totalP2PTransactions: number;
  totalBankDeposits: number;
  availableBalance: number;
  recentActivityCount: number;
}

export const AccountStats = ({
  totalP2PTransactions,
  totalBankDeposits,
  availableBalance,
  recentActivityCount,
}: AccountStatsProps) => {
  const stats = [
    {
      value: totalP2PTransactions,
      label: "Total P2P Transfers",
    },
    {
      value: totalBankDeposits,
      label: "Bank Deposits",
    },
    {
      value: `₹${(availableBalance / 100).toLocaleString("en-IN")}`,
      label: "Available Now",
    },
    {
      value: recentActivityCount,
      label: "Recent Activity",
    },
  ];

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Account Statistics</CardTitle>
          <CardDescription>Overview of your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-magnolia-800">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


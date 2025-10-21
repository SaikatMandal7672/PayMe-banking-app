import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface BankTransfer {
  amount: number;
  time: Date;
  status: string;
  provider: string;
}

interface RecentBankTransfersProps {
  transactions: BankTransfer[];
}

export const RecentBankTransfers = ({
  transactions,
}: RecentBankTransfersProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Bank Transfers</CardTitle>
            <CardDescription>Your recent deposits</CardDescription>
          </div>
          <Link href="/dashboard/transaction">
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <Download className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {transaction.provider}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.time).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    +₹{(transaction.amount / 100).toLocaleString("en-IN")}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      transaction.status === "Success"
                        ? "text-green-600"
                        : transaction.status === "Processing"
                          ? "text-orange-600"
                          : "text-red-600"
                    )}
                  >
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No bank transfers yet</p>
            <Link href="/dashboard/transfer">
              <Button variant="link" className="mt-2">
                Add money to wallet
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


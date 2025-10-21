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
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface P2PTransaction {
  id: string;
  amount: number;
  time: Date;
  fromUser: string;
  toUser: string;
  fromName: string | null;
  toName: string | null;
}

interface RecentP2PTransactionsProps {
  transactions: P2PTransaction[];
  userId: string;
}

export const RecentP2PTransactions = ({
  transactions,
  userId,
}: RecentP2PTransactionsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">P2P Transactions</CardTitle>
            <CardDescription>Your recent peer transfers</CardDescription>
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
            {transactions.map((transaction) => {
              const isSent = transaction.fromUser === userId;
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        isSent
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      )}
                    >
                      {isSent ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {isSent
                          ? `To ${transaction.toName}`
                          : `From ${transaction.fromName}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(transaction.time).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "font-semibold",
                      isSent ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {isSent ? "-" : "+"}₹
                    {(transaction.amount / 100).toLocaleString("en-IN")}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No P2P transactions yet</p>
            <Link href="/dashboard/p2p">
              <Button variant="link" className="mt-2">
                Send money to peers
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};



import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheck, CircleX, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}

let index = 0;

const OnRampTransaction = ({ transactions }: Props) => {
  if (!transactions?.length) {
    return (
      <Card>
        <CardHeader className=" bg-amber-100">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your recent payment activity</CardDescription>
        </CardHeader>
        <CardContent className="bg-pink-400">
          <div className="text-center pb-8 pt-8">No Recent transactions</div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Self Transactions</CardTitle>
        <CardDescription>Your recent payment activity</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="">
          {transactions.map((transaction) => (
            <div key={index++} className="flex justify-between">
              <div>
                <div className="text-sm">
                  {transaction.status === "Processing" ? (
                    <div className="flex gap-x-1 items-center text-blue-900">
                      <Clock className="h-4 w-4" /> Pending
                    </div>
                  ) : transaction.status === "Success" ? (
                    <div className="flex gap-x-1 items-center text-green-600">
                      <CheckCheck className="h-4 w-4" /> Successful
                    </div>
                  ) : (
                    <div className="flex gap-x-1 items-center text-red-700">
                      <CircleX className="h-4 w-4" /> Pending
                    </div>
                  )}
                </div>
                <div className="text-slate-600 text-xs pl-5">
                  {transaction.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                + Rs {transaction.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full"

        >
          <Link href="/dashboard/transaction"> View All Transactions</Link>
         
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnRampTransaction;

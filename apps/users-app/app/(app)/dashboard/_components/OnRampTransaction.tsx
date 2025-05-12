import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface Props {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}
const recentTransactions = [
  {
    id: 1,
    name: "Sarah Johnson",
    amount: 250.0,
    type: "received",
    date: "May 10, 2025",
  },
  {
    id: 2,
    name: "Michael Chen",
    amount: 75.5,
    type: "sent",
    date: "May 09, 2025",
  },
  {
    id: 3,
    name: "Jessica Williams",
    amount: 120.0,
    type: "received",
    date: "May 08, 2025",
  },
];

const OnRampTransaction = ({ transactions }: Props) => {
//   if (!transactions?.length) {
//     return (
//       <Card>
//         <CardHeader className=" bg-amber-100">
//           <CardTitle>Recent Transactions</CardTitle>
//           <CardDescription >Your recent payment activity</CardDescription>
//         </CardHeader>
//         <CardContent className="bg-pink-400">
//           <div className="text-center pb-8 pt-8">No Recent transactions</div>
//         </CardContent>
//       </Card>
//     );
//   }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your recent payment activity</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between bg-amber-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${transaction.type === "received" ? "bg-green-100 text-green-600" : "bg-payme-100 text-payme-600"} flex items-center justify-center`}
                >
                  {transaction.type === "received" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium">{transaction.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {transaction.date}
                  </div>
                </div>
              </div>
              <div
                className={`font-medium ${transaction.type === "received" ? "text-green-600" : "text-payme-600"}`}
              >
                {transaction.type === "received" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnRampTransaction;

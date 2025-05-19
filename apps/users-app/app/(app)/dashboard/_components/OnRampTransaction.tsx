import  {Button}  from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckCheck, CircleX, Clock, ArrowDown, Calendar } from "lucide-react";
import React from "react";

interface Props {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
  className?: string;
}
interface StatusConfigItem {
  icon: React.ReactNode;
  label: string;
  color: string;
}

interface StatusConfig {
  [key: string]: StatusConfigItem;
}
const OnRampTransaction = ({ transactions = [], className }: Props) => {
  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return "₹0.00";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    try {
      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date));
    } catch (e) {
      return "";
    }
  };

  const statusConfig: StatusConfig = {
    Processing: {
      icon: <Clock className="h-4 w-4" />,
      label: "Processing",
      color: "text-blue-700 bg-blue-50",
    },
    Success: {
      icon: <CheckCheck className="h-4 w-4" />,
      label: "Successful",
      color: "text-green-700 bg-green-50",
    },
    Failed: {
      icon: <CircleX className="h-4 w-4" />,
      label: "Failed",
      color: "text-red-700 bg-red-50",
    },
  };

  if (!transactions?.length) {
    return (
      <Card className={cn("shadow-md", className)}>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center">
            <ArrowDown className="h-5 w-5 mr-2 text-blue-600" />
            Recent Self Transactions
          </CardTitle>
          <CardDescription>Your recent payment activity</CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-700">
                No Recent Transactions
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                When you add money to your account, transactions will appear
                here
              </p>
            </div>
            <Button className="mt-2">Add Money</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl font-bold">
              <ArrowDown className="h-5 w-5 mr-2 text-blue-600" />
              Recent Self Transactions
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Your recent payment activity
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pb-2 max-h-96 overflow-auto pt-2 px-0 scrollbar scrollbar-thumb-magnolia-500">
        <ul className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => {
            const status =
              statusConfig[transaction.status] || statusConfig.Failed;

            return (
              <li
                key={index}
                className="px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${status?.color.includes("green") ? "bg-green-50" : status?.color.includes("blue") ? "bg-blue-50" : "bg-red-50"}`}
                    >
                      {status?.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color}`}
                        >
                          {status?.label}
                        </span>
                        {transaction.provider && (
                          <span className="text-xs text-gray-500">
                            via {transaction.provider}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(transaction.time)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      +{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4">
        <Button
          variant="outline"
          className="w-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnRampTransaction;

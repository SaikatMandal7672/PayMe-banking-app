import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Clock, X } from "lucide-react";
import Link from "next/link";

interface Transaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions = [] }: RecentTransactionsProps) => {
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCheck className="h-4 w-4 text-green-600" />;
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "Failed":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-50 text-green-700";
      case "Processing":
        return "bg-blue-50 text-blue-700";
      case "Failed":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  if (!transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Deposits</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-sm text-gray-500">
          No transactions yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Deposits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {transactions.map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  {getStatusIcon(tx.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                    <span className="text-xs text-gray-500">{tx.provider}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(tx.time)}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-green-600">{formatCurrency(tx.amount)}</p>
              </div>
            </div>
          ))}
        </div>
        <Link href="/dashboard/transaction" className="block mt-4">
          <Button variant="outline" className="w-full">
            View All
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};


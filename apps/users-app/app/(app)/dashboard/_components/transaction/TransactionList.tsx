"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Clock,
  CheckCheck,
  X,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { TransactionFilters } from "./TransactionFilters";

interface P2PTransaction {
  id: string;
  amount: number;
  time: Date;
  senderName: string;
  senderNumber: string;
  recieverName: string;
  recieverNumber: string;
  fromUser: string;
  toUser: string;
}

interface BankTransaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

interface TransactionListProps {
  p2pTransactions: P2PTransaction[];
  bankTransactions: BankTransaction[];
  userId: string;
}

export const TransactionList = ({
  p2pTransactions,
  bankTransactions,
  userId,
}: TransactionListProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [p2pFilter, setP2pFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString("en-IN")}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const filteredP2P = p2pTransactions.filter((t) => {
    const matchesFilter =
      p2pFilter === "all" ||
      (p2pFilter === "sent" && t.fromUser === userId) ||
      (p2pFilter === "received" && t.toUser === userId);

    const matchesSearch =
      searchQuery === "" ||
      t.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.recieverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.senderNumber.includes(searchQuery) ||
      t.recieverNumber.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  const filteredBank = bankTransactions.filter((t) => {
    return (
      searchQuery === "" ||
      t.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const allTransactions = [
    ...filteredP2P.map((t) => ({ ...t, type: "p2p" as const })),
    ...filteredBank.map((t) => ({ ...t, type: "bank" as const })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

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
        return "bg-green-50 text-green-700 border-green-200";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const renderTransactions = () => {
    let transactionsToShow: any[] = [];

    if (activeTab === "all") {
      transactionsToShow = allTransactions;
    } else if (activeTab === "p2p") {
      transactionsToShow = filteredP2P.map((t) => ({ ...t, type: "p2p" }));
    } else if (activeTab === "bank") {
      transactionsToShow = filteredBank.map((t) => ({ ...t, type: "bank" }));
    }

    if (transactionsToShow.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No transactions found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Your transactions will appear here"}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {transactionsToShow.map((transaction, index) => {
          if (transaction.type === "p2p") {
            const isSent = transaction.fromUser === userId;
            return (
              <div
                key={`p2p-${transaction.id}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "p-2.5 rounded-full",
                      isSent
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    )}
                  >
                    {isSent ? (
                      <ArrowUpRight className="h-5 w-5" />
                    ) : (
                      <ArrowDownLeft className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {isSent ? "Sent to" : "Received from"}{" "}
                      <span className="font-semibold">
                        {isSent
                          ? transaction.recieverName || transaction.recieverNumber
                          : transaction.senderName || transaction.senderNumber}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(transaction.time)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-semibold text-lg",
                      isSent ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {isSent ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">P2P Transfer</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={`bank-${index}`}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-blue-100 text-blue-600">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{transaction.provider}</p>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1",
                          getStatusColor(transaction.status)
                        )}
                      >
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(transaction.time)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-green-600">
                    +{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-muted-foreground">Bank Deposit</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <CardTitle className="text-xl">Transaction History</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, number, or provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <TransactionFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeFilter={p2pFilter}
            onFilterChange={setP2pFilter}
          />
        </div>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        {renderTransactions()}
      </CardContent>
    </Card>
  );
};


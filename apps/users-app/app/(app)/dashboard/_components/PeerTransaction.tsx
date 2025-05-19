"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoveDownLeft, MoveUpRight, Clock } from "lucide-react";
import React from "react";
import { useState } from "react";

interface PeerTransactionProps {
  transactions: {
    id: string;
    amount: number;
    time: Date;
    senderName: string;
    senderNumber: string;
    recieverName: string;
    recieverNumber: string;
    fromUser: string;
    toUser: string;
  }[];
  userId: string;
}

const PeerTransaction = ({
  transactions = [],
  userId = "",
}: PeerTransactionProps) => {
  const [filter, setFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    if (amount === undefined || amount === null) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(date));
    } catch (e) {
      return "";
    }
  };

  const filteredTransactions = transactions
    ? transactions.filter((t) => {
        if (filter === "all") return true;
        if (filter === "sent") return t.fromUser === userId;
        if (filter === "received") return t.toUser === userId;
        return true;
      })
    : [];

  return (
    <div className="flex-1">
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="lg:flex items-center gap-y-2  justify-between">
            <div>
              <CardTitle className="lg:text-xl text-lg font-bold">
                Peer Transactions
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Your peer transfers history
              </CardDescription>
            </div>
            <div className="flex  gap-2">
              <Button
                variant={"outline"}
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm rounded-lg ${filter === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                All
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setFilter("sent")}
                className={`px-3 py-1 text-sm rounded-lg ${filter === "sent" ? "bg-red-100 text-red-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                Sent
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setFilter("received")}
                className={`px-3 py-1 text-sm rounded-lg ${filter === "received" ? "bg-green-100 text-green-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                Received
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="max-h-96 min-h-80 overflow-y-auto px-0 py-2 scrollbar scrollbar-thumb-magnolia-500">
          {filteredTransactions.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              No transactions found
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredTransactions.map((t) => (
                <li
                  key={t.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${t.fromUser === userId ? "bg-red-50" : "bg-green-50"}`}
                      >
                        {t.fromUser === userId ? (
                          <MoveUpRight className="h-5 w-5 text-red-500" />
                        ) : (
                          <MoveDownLeft className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {t.fromUser === userId ? (
                            <>
                              Sent to{" "}
                              <span className="font-semibold">
                                {t.recieverName? t.recieverName: t.recieverNumber}
                              </span>
                            </>
                          ) : (
                            <>
                              Received from{" "}
                              <span className="font-semibold">{
                                t.senderName? t.senderName :t.senderNumber}</span>
                            </>
                          )}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(t.time)}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${t.fromUser === userId ? "text-red-600" : "text-green-600"}`}
                    >
                      {t.fromUser === userId ? "-" : "+"}
                      {formatCurrency(t.amount)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerTransaction;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";

interface TransactionFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TransactionFilters = ({
  activeTab,
  onTabChange,
  activeFilter,
  onFilterChange,
}: TransactionFiltersProps) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Transaction Type Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="all" className="text-sm">
            All Transactions
          </TabsTrigger>
          <TabsTrigger value="p2p" className="text-sm">
            Peer Transfers
          </TabsTrigger>
          <TabsTrigger value="bank" className="text-sm">
            Bank Deposits
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* P2P Direction Filter (only shown for P2P tab) */}
      {activeTab === "p2p" && (
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("all")}
              className="text-xs"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "sent" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("sent")}
              className="text-xs"
            >
              Sent
            </Button>
            <Button
              variant={activeFilter === "received" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("received")}
              className="text-xs"
            >
              Received
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


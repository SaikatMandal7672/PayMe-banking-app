import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Send, Activity, CreditCard } from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      href: "/dashboard/transfer",
      icon: Download,
      label: "Add Money",
      color: "text-magnolia-700",
    },
    {
      href: "/dashboard/p2p",
      icon: Send,
      label: "Send Money",
      color: "text-magnolia-700",
    },
    {
      href: "/dashboard/transaction",
      icon: Activity,
      label: "Transactions",
      color: "text-magnolia-700",
    },
    {
      href: "/dashboard/transfer",
      icon: CreditCard,
      label: "Transfer",
      color: "text-magnolia-700",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-magnolia-900 mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-24 flex flex-col gap-2 hover:bg-magnolia-100 hover:border-magnolia-600 transition-all"
              >
                <Icon className={`h-6 w-6 ${action.color}`} />
                <span className="font-medium">{action.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};


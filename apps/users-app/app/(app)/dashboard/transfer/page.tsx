import React from "react";
import { AddMoneyCard } from "../_components/AddMoneyCard";
import BalanceCard from "../_components/BalanceCard";
import OnRampTransaction from "../_components/OnRampTransaction";
import { cn } from "@/lib/utils";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";
import { connection } from "next/server";

async function getUserData() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userId = session?.user?.id;
  const [balance, transactions] = await Promise.all([
    prisma.balance.findFirst({
      where: { userId },
    }),
    prisma.onRampTransaction.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
      take: 4,
    }),
  ]);

  return {
    balance: {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    },
    transactions: transactions.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })),
  };
}

const Transfer = async () => {
  await connection();

  // Get all data in parallel
  const { balance, transactions } = await getUserData();

  return (
    <div
      className={cn(
        "min-h-screen w-screen px-10 py-5 transition-all duration-300 ease-in-out ml-48"
      )}
    >
      <h1 className="text-4xl font-bold text-magnolia-900 mb-8">Transfer</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 mb-4 gap-8">
        <AddMoneyCard />
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <OnRampTransaction transactions={transactions} />
    </div>
  );
};

export default Transfer;

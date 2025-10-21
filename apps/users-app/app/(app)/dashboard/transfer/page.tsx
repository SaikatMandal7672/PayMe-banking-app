import React from "react";
import { AddMoneyForm, BalanceDisplay, RecentTransactions } from "../_components/transfer";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
      take: 5,
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
  const { balance, transactions } = await getUserData();

  return (
    <div className="min-h-screen px-4 md:px-10 py-5 md:py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">Add Money</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <AddMoneyForm />
        <BalanceDisplay amount={balance.amount} locked={balance.locked} />
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
};

export default Transfer;

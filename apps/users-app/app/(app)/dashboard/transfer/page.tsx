import React from "react";
import { AddMoneyCard } from "../_components/AddMoneyCard";
import BalanceCard from "../_components/BalanceCard";
import OnRampTransaction from "../_components/OnRampTransaction";
import { cn } from "@/lib/utils";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      // @ts-expect-error: user object is extended to include id
      userId: session?.user?.id,
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      // @ts-expect-error: user object is extended to include id
      userId: session?.user?.id,
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
const Trasfer = async () => {
  // const isMobile = useMediaQuery("(max-width: 767px");
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  return (
    <div
      className={cn(
        "min-h-screen px-10 py-5 w-full transition-all duration-300 ease-in-out ml-48"
        // !isMobile ? "ml-48" : "ml-0"
      )}
    >
      <h1 className="text-4xl  font-bold text-magnolia-900 mb-8">Transfer</h1>
      <div className="grid md:grid-cols-2  grid-cols-1  mb-4 gap-8">
        <AddMoneyCard />
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
      <OnRampTransaction transactions={transactions}/>
    </div>
  );
};

export default Trasfer;

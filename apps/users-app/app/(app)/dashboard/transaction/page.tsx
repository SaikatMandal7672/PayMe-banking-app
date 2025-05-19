import React from "react";
import { prisma } from "@repo/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import OnRampTransaction from "../_components/OnRampTransaction";
import P2PTransactions from "../_components/PeerTransaction";
import PeerTransaction from "../_components/PeerTransaction";

const getTransactionData = async () => {
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userId = session?.user?.id;
  console.log(session);
  const p2pTransactions = await prisma.p2pTransfers.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: {
        select: { number: true, name: true },
      },
      toUser: {
        select: { number: true, name: true },
      },
    },
  });

  const onRampTransaction = await prisma.onRampTransaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return {
    p2pTransactions: p2pTransactions.map((p) => ({
      id: p.id,
      amount: p.amount,
      time: p.timestamp,
      senderName: p.fromUser.name ?? "",
      senderNumber: p.fromUser.number,
      recieverName: p.toUser.name ?? "",
      recieverNumber: p.toUser.number,
      fromUser: p.fromUserId,
      toUser: p.toUserId,
    })),
    userId,
    onRampTransaction: onRampTransaction.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })),
  };
};

const Transaction = async () => {
  const { p2pTransactions, onRampTransaction, userId } =
    await getTransactionData();
  // console.log(onRampTransaction);

  return (
    <div className="p-5	flex flex-col flex-1 h-full overflow-auto">
      <h1 className="text-5xl font-semibold text-magnolia-900 mb-4">Transaction</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <PeerTransaction transactions={p2pTransactions} userId={userId} />

        <OnRampTransaction
          transactions={onRampTransaction}
          className="flex-1 h-full"
        />
      </div>
    </div>
  );
};

export default Transaction;

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";

export async function getTransactionData() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error - NextAuth session type doesn't include id by default
  const userId = session?.user?.id;

  const [p2pTransactions, onRampTransactions] = await Promise.all([
    prisma.p2pTransfers.findMany({
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
      orderBy: {
        timestamp: "desc",
      },
    }),
    prisma.onRampTransaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        startTime: "desc",
      },
    }),
  ]);

  // Calculate statistics
  const totalSent = p2pTransactions
    .filter((t) => t.fromUserId === userId)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReceived = p2pTransactions
    .filter((t) => t.toUserId === userId)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDeposits = onRampTransactions
    .filter((t) => t.status === "Success")
    .reduce((sum, t) => sum + t.amount, 0);

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
    onRampTransactions: onRampTransactions.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    })),
    stats: {
      totalTransactions: p2pTransactions.length + onRampTransactions.length,
      totalSent,
      totalReceived,
      totalDeposits,
    },
    userId,
  };
}


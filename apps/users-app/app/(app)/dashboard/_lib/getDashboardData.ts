import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@repo/database";
import type { RecentP2PTransaction } from "@/lib/types/p2p";


export async function getDashboardData() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error - NextAuth session type doesn't include id by default
  const userId = session?.user?.id;

  const [balance, recentP2P, recentOnRamp, totalTransactions] =
    await Promise.all([
      prisma.balance.findFirst({
        where: { userId },
      }),
      prisma.p2pTransfers.findMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
        include: {
          fromUser: { select: { name: true, number: true } },
          toUser: { select: { name: true, number: true } },
        },
        orderBy: { timestamp: "desc" },
        take: 5,
      }),
      prisma.onRampTransaction.findMany({
        where: { userId },
        orderBy: { startTime: "desc" },
        take: 5,
      }),
      prisma.p2pTransfers.count({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
      }),
    ]);

  return {
    user: {
      name: session?.user?.name || "User",
      email: session?.user?.email || "",
    },
    balance: {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    },
    recentP2P: recentP2P.map((t: typeof recentP2P[0]) => ({
      id: t.id,
      amount: t.amount,
      time: t.timestamp,
      fromUser: t.fromUserId,
      toUser: t.toUserId,
      fromName: t.fromUser.name,
      toName: t.toUser.name,
    })) as RecentP2PTransaction[],
    recentOnRamp: recentOnRamp.map((t:typeof recentP2P[0]) => ({
      amount: t.amount,
      time: t.startTime,
      status: t.status,
      provider: t.provider,
    })),
    stats: {
      totalTransactions,
      totalOnRamp: recentOnRamp.length,
    },
    userId,
  };
}


import React from "react";
import { getDashboardData } from "./_lib/getDashboardData";
import {
  WelcomeSection,
  BalanceCards,
  QuickActions,
  RecentP2PTransactions,
  RecentBankTransfers,
  AccountStats,
} from "./_components/home";

const Dashboard = async () => {
  const { user, balance, recentP2P, recentOnRamp, stats, userId } =
    await getDashboardData();

  const totalBalance = balance.amount + balance.locked;

  return (
    <div className="min-h-screen px-4 md:px-10 py-5 md:py-8">
      {/* Welcome Section */}
      <WelcomeSection userName={user.name} />

      {/* Balance Overview Cards */}
      <BalanceCards
        totalBalance={totalBalance}
        unlockedBalance={balance.amount}
        lockedBalance={balance.locked}
      />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentP2PTransactions transactions={recentP2P} userId={userId} />
        <RecentBankTransfers transactions={recentOnRamp} />
      </div>

      {/* Stats Section */}
      <AccountStats
        totalP2PTransactions={stats.totalTransactions}
        totalBankDeposits={stats.totalOnRamp}
        availableBalance={balance.amount}
        recentActivityCount={recentP2P.length + recentOnRamp.length}
      />
    </div>
  );
};

export default Dashboard;

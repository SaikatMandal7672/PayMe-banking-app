import React from "react";
import { getTransactionData } from "../_lib/getTransactionData";
import {
  TransactionHeader,
  TransactionList,
} from "../_components/transaction";

const Transaction = async () => {
  const { p2pTransactions, onRampTransactions, stats, userId } =
    await getTransactionData();

  return (
    <div className="min-h-screen px-4 md:px-10 py-5 md:py-8">
      <TransactionHeader
        totalTransactions={stats.totalTransactions}
        totalSent={stats.totalSent}
        totalReceived={stats.totalReceived}
        totalDeposits={stats.totalDeposits}
      />
      <TransactionList
        p2pTransactions={p2pTransactions}
        bankTransactions={onRampTransactions}
        userId={userId}
      />
    </div>
  );
};

export default Transaction;

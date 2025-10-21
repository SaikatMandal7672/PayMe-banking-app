/**
 * P2P Transaction Types and Interfaces
 */

/**
 * P2P Transaction interface for transaction list display
 * Used in TransactionList component and transaction history
 */
export interface P2PTransaction {
  id: string;
  amount: number;
  time: Date;
  senderName: string;
  senderNumber: string;
  recieverName: string;
  recieverNumber: string;
  fromUser: string;
  toUser: string;
}

/**
 * P2P Transaction interface for home page recent transactions
 * Simplified version with user names
 */
export interface RecentP2PTransaction {
  id: string;
  amount: number;
  time: Date;
  fromUser: string;
  toUser: string;
  fromName: string | null;
  toName: string | null;
}

/**
 * P2P Transfer Request payload
 * Used when creating a new P2P transaction
 */
export interface P2PTransferRequest {
  receiverNumber: string;
  amount: number; // Amount in paise (smallest unit)
}

/**
 * P2P Transfer Response
 * Response from createP2PTransaction action
 */
export interface P2PTransferResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  timestamp?: Date;
}

/**
 * P2P Transaction Statistics
 * Used for dashboard analytics
 */
export interface P2PTransactionStats {
  totalTransactions: number;
  totalSent: number;
  totalReceived: number;
  averageTransactionAmount: number;
  lastTransactionDate: Date | null;
}

/**
 * P2P Transaction Filter Options
 * Used for filtering transactions in the transaction list
 */
export interface P2PTransactionFilter {
  direction?: "sent" | "received" | "all";
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}

/**
 * P2P Transaction with User Details
 * Complete transaction object with full user information
 */
export interface P2PTransactionWithDetails {
  id: string;
  amount: number;
  timestamp: Date;
  fromUserId: string;
  toUserId: string;
  fromUser: {
    id: string;
    name: string | null;
    number: string;
    email: string | null;
  };
  toUser: {
    id: string;
    name: string | null;
    number: string;
    email: string | null;
  };
}

/**
 * P2P Transaction Status
 * Possible statuses for a P2P transaction
 */
export type P2PTransactionStatus = "completed" | "pending" | "failed";

/**
 * P2P Transaction with Status
 * Extended transaction object with status tracking
 */
export interface P2PTransactionWithStatus extends P2PTransaction {
  status: P2PTransactionStatus;
  failureReason?: string;
}

/**
 * Receiver Information
 * Used for validating and displaying receiver details
 */
export interface ReceiverInfo {
  id: string;
  name: string | null;
  number: string;
  email: string | null;
}

/**
 * P2P Transaction Validation Result
 * Result of validating a P2P transaction
 */
export interface P2PValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}


/**
 * P2P Transaction Validation Utilities
 */

import type { P2PValidationResult, P2PTransferRequest } from "@/lib/types/p2p";

/**
 * Validates a phone number format
 * @param phoneNumber - The phone number to validate
 * @returns true if valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return false;
  }

  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Check if it's between 10-15 digits (international standard)
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};

/**
 * Validates an amount
 * @param amount - The amount to validate (in paise)
 * @param minAmount - Minimum allowed amount (default: 100 paise = ₹1)
 * @param maxAmount - Maximum allowed amount (default: 100000000 paise = ₹10,00,000)
 * @returns true if valid, false otherwise
 */
export const isValidAmount = (
  amount: number,
  minAmount: number = 100,
  maxAmount: number = 100000000
): boolean => {
  if (!Number.isInteger(amount)) {
    return false;
  }

  return amount >= minAmount && amount <= maxAmount;
};

/**
 * Validates a P2P transfer request
 * @param request - The P2P transfer request to validate
 * @returns Validation result with errors if any
 */
export const validateP2PTransfer = (
  request: Partial<P2PTransferRequest>
): P2PValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate receiver number
  if (!request.receiverNumber) {
    errors.push("Receiver phone number is required");
  } else if (!isValidPhoneNumber(request.receiverNumber)) {
    errors.push("Invalid phone number format. Please enter a valid phone number.");
  }

  // Validate amount
  if (request.amount === undefined || request.amount === null) {
    errors.push("Amount is required");
  } else if (!isValidAmount(request.amount)) {
    errors.push("Amount must be between ₹1 and ₹10,00,000");
  }

  // Check for self-transfer (warning, not error)
  if (request.receiverNumber && request.receiverNumber.trim().length > 0) {
    // This would need to be checked against the current user's number
    // For now, we'll just add a placeholder
    warnings.push("Please ensure you're sending to the correct recipient");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};

/**
 * Formats a phone number for display
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  if (cleanNumber.length === 10) {
    // Indian format: XXXX XXXXXX
    return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4)}`;
  } else if (cleanNumber.length === 12) {
    // Indian format with country code: +91 XXXX XXXXXX
    return `+${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 6)} ${cleanNumber.slice(6)}`;
  }

  return phoneNumber;
};

/**
 * Formats an amount for display
 * @param amountInPaise - The amount in paise
 * @returns Formatted amount string
 */
export const formatAmount = (amountInPaise: number): string => {
  const amountInRupees = amountInPaise / 100;
  return `₹${amountInRupees.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Parses an amount string to paise
 * @param amountString - The amount string (e.g., "100" or "100.50")
 * @returns Amount in paise
 */
export const parseAmountToPaise = (amountString: string): number => {
  const amount = parseFloat(amountString);
  if (isNaN(amount)) {
    return 0;
  }
  return Math.round(amount * 100);
};

/**
 * Checks if a phone number is the same as another (ignoring formatting)
 * @param phoneNumber1 - First phone number
 * @param phoneNumber2 - Second phone number
 * @returns true if they represent the same number
 */
export const isSamePhoneNumber = (
  phoneNumber1: string,
  phoneNumber2: string
): boolean => {
  const clean1 = phoneNumber1.replace(/\D/g, "");
  const clean2 = phoneNumber2.replace(/\D/g, "");
  return clean1 === clean2;
};

/**
 * Validates if the sender and receiver are different
 * @param senderNumber - Sender's phone number
 * @param receiverNumber - Receiver's phone number
 * @returns true if they are different
 */
export const isValidTransferDirection = (
  senderNumber: string,
  receiverNumber: string
): boolean => {
  return !isSamePhoneNumber(senderNumber, receiverNumber);
};


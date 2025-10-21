"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createP2PTransactions } from "@/lib/actions/createP2PTransaction";
import { toast } from "sonner";
import { SendHorizontalIcon } from "lucide-react";
import { validateP2PTransfer, parseAmountToPaise } from "@/lib/utils/p2p-validation";

export const P2PForm = () => {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    const amountInPaise = parseAmountToPaise(amount);
    const validation = validateP2PTransfer({
      receiverNumber: number,
      amount: amountInPaise,
    });

    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      setIsLoading(true);
      const result = await createP2PTransactions(number, amountInPaise);

      if (result?.success) {
        toast.success(result.message);
        setAmount("");
        setNumber("");
      } else {
        toast.error(result?.message || "Transfer failed");
      }
    } catch (error) {
      toast.error("Failed to process transfer");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="10-digit phone number"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <SendHorizontalIcon className="h-4 w-4 mr-2" />
              Send Money
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};


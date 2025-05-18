"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@repo/ui/select";
import { createOnRampTransaction } from "@/lib/actions/onRampTransactions";
import { toast } from "sonner";
import Image from "next/image";
import { SendHorizontal, SendHorizontalIcon } from "lucide-react";
import { createP2PTransactions } from "@/lib/actions/createP2PTransaction";

export const P2PCard = () => {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSend = async () => {
    if (amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }
    if (!number) {
      toast.error("Enter valid Phone Number");
      return;
    }
    try {
      setIsLoading(true);
      const result = await createP2PTransactions(number, amount * 100);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("Failed to process transaction");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="lg:w-1/2 md:w-2/3 w-full">
      <CardHeader>
        <CardTitle className="text-xl">Send Money</CardTitle>
        <div className="h-[1px] bg-muted-foreground/50 w-full"></div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              className="bg-gray-100/70"
              placeholder="Amount"
              type="number"
              min="1"
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              className="bg-gray-100/70"
              placeholder="91233xxxxx"
              type="text"
              min="1"
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSend}
          className="mx-auto bg-magnolia-700 hover:bg-magnolia-700/80"
          disabled={isLoading}
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <div className="flex">
              <SendHorizontalIcon className="h-4 w-4 mr-2" /> Send
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

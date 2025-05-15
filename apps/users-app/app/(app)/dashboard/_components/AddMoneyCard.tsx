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

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export const AddMoneyCard = () => {
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
  const [amount, setAmount] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);
      const result = await createOnRampTransaction(
        amount * 100,
        provider as string
      );

      if (result.success) {
        toast.success(result.message);
        window.open(redirectUrl, "_blank");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to process transaction");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Add Money</CardTitle>
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
            <Label>Bank</Label>
            <Select
              onSelect={(value) => {
                const selectedBank = SUPPORTED_BANKS.find(
                  (x) => x.name === value
                );
                if (selectedBank) {
                  setRedirectUrl(selectedBank.redirectUrl);
                  setProvider(selectedBank.name);
                }
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name,
              }))}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAdd}
          className="mx-auto bg-magnolia-700 hover:bg-magnolia-700/80"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Add money"}
        </Button>
      </CardFooter>
    </Card>
  );
};

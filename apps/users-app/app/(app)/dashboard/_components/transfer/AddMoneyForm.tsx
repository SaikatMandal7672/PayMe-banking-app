"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const AddMoneyForm = () => {
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
  const [amount, setAmount] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!amount || parseInt(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);
      const result = await createOnRampTransaction(parseInt(amount) * 100, provider as string);

      if (result.success) {
        toast.success(result.message);
        window.open(redirectUrl, "_blank");
        setAmount("");
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
        <CardTitle>Add Money</CardTitle>
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
          <Label htmlFor="bank">Bank</Label>
          <Select
            onSelect={(value) => {
              const selectedBank = SUPPORTED_BANKS.find((x) => x.name === value);
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
        <Button onClick={handleAdd} disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Add Money"}
        </Button>
      </CardContent>
    </Card>
  );
};


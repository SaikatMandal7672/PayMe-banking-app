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
import { SendHorizontal } from "lucide-react";

export const P2PCard = () => {
  const [amount, setAmount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="w-xl">
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
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            />
          </div>
        
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="mx-auto bg-magnolia-700 hover:bg-magnolia-700/80"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : (
            <div className="flex"> 
               <SendHorizontal className="h-4 w-4 mr-2" /> Send
            </div>)}
        </Button>
      </CardFooter>
    </Card>
  );
};

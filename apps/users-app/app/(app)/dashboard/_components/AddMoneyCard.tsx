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
import {Select} from "@repo/ui/select"
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
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
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

            <Input className="bg-gray-100/70" placeholder="Amount" 
              onChange={()=>{}}
            />
          </div>
          <div className="space-y-2">
            <Label>Bank</Label>
            <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
          </div>
        </div>
      </CardContent>
      <CardFooter >
        <Button className="mx-auto bg-magnolia-700 hover:bg-magnolia-700/80">Add money</Button>
      </CardFooter>
    </Card>
  );
};

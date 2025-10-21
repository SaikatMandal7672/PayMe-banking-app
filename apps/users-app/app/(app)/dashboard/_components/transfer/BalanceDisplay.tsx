import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceDisplayProps {
  amount: number;
  locked: number;
}

export const BalanceDisplay = ({ amount = 0, locked = 0 }: BalanceDisplayProps) => {
  const total = amount + locked;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between py-2 border-b">
          <span className="text-sm">Available</span>
          <span className="font-semibold">₹{(amount / 100).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-sm">Locked</span>
          <span className="font-semibold">₹{(locked / 100).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-sm font-medium">Total</span>
          <span className="font-semibold text-lg">₹{(total / 100).toLocaleString("en-IN")}</span>
        </div>
      </CardContent>
    </Card>
  );
};


import { create } from "zustand"

interface BalanceProps{
  balance: number;
  setBalance: (balance: number) => void;
}

export const useBalance = create<BalanceProps>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance })
}));

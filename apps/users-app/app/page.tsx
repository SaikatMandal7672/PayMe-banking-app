'use client'
import {useBalance} from "@repo/store/balance";

export default function Home() {
  const {balance} = useBalance();
  return (
    
    <div className="h-screen text-neutral-800 w-full bg-sky-200 text-5xl flex justify-center items-center">
      <h1>Welcome to the payments app </h1>
      <div>ur balance is {balance}</div>
    </div>
      
  );
}

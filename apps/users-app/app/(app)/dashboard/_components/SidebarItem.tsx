'use client'
import { useRouter , usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
interface SideBarProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}
export const SidebarItem = ({ href, title, icon }: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className={cn(
        "flex text-slate-500 cursor-pointer p-2 pl-8",
        selected && "bg-muted-foreground/10"
      )}
    >
      <div className="pr-2">{icon}</div>
      <div
        className={`font-semibold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </div>
    </div>
  );
};

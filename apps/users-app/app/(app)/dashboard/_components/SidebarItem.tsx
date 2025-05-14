"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
interface SideBarProps {
  isExpanded:boolean;
  href: string;
  title: string;
  icon: React.ReactNode;
}
export const SidebarItem = ({isExpanded, href, title, icon }: SideBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className={cn(
        "flex text-slate-500 cursor-pointer p-2 pl-8 transition-all duration-250 ease-in-out",
        selected && "bg-muted-foreground/10",
        isMobile && !isExpanded && "hidden",
        isExpanded && "block"
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

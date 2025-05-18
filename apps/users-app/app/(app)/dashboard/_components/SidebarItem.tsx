"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface SideBarProps {
  isExpanded: boolean;
  href: string;
  title: string;
  icon: LucideIcon;
  handleCollapse: () => void;
}

export const SidebarItem = ({
  isExpanded,
  href,
  title,
  icon: Icon,
  handleCollapse,
}: SideBarProps) => {
  const itemsRef = useRef<HTMLDivElement>(null)
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;
  const isMobile = useMediaQuery("(max-width:768px)");
  const collapse = ()=>{
    if(itemsRef.current){
      itemsRef.current.style.display = "hidden";
    }
  }

  return (
    <motion.div
      ref = {itemsRef}
      animate={{
        opacity: isMobile ? (isExpanded ? 100 : 0) : 100,
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      onClick={() => {
        router.push(href);
        if(isMobile) {handleCollapse()};
      }}
      className={cn(
        "hidden md:flex items-center gap-x-2 text-slate-500 cursor-pointer p-2 pl-8 transition-all duration-250 ease-in-out w-full ",
        isExpanded && "flex gap-x-2",
        selected && "bg-muted-foreground/10"
      )}
    >
      <motion.div>
        <Icon className="h-5 w-5" />
      </motion.div>
      <motion.div
        className={`font-semibold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}
      >
        {title}
      </motion.div>
    </motion.div>
  );
};

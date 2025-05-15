"use client";
import React, { useEffect, useRef, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { ChevronLeft, Menu } from "lucide-react";

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    console.log("hello");
    if (sidebarRef.current) {
      setIsExpanded(true);
      sidebarRef.current.style.width = isMobile ? " 100%" : "0";
      sidebarRef.current.style.height = isMobile ? " 100%" : "0";
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    console.log(isExpanded);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "0" : "0";
      sidebarRef.current.style.height = isMobile ? "0" : "0";
    }
  };
  const resetWidth = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "100%" : "192px";
    }
  };
  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  console.log(isMobile);
  return (
    <>
      <div
        onClick={handleCollapse}
        ref={sidebarRef}
        className={cn(
          "w-48 pt-5 border border-r-2 border-r-muted-foreground/15  min-h-screen fixed transition-all duration-300 linear z-[999999] bg-purple-200/70",
          isMobile && "w-0 absolute"
        )}
      >
        <div
          className={cn(
            "fixed right-0 mr-4 rounded-sm text-muted-foreground bg-purple-300 hover:bg-purple-200 hover:text-purple-950 cursor-pointer",
            isExpanded ? "block" : "hidden"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <SidebarItem
            href={"/dashboard"}
            icon={<HomeIcon />}
            title="Home"
            isExpanded={isExpanded}
          />
          <SidebarItem
            isExpanded={isExpanded}
            href={"/dashboard/transfer"}
            icon={<TransferIcon />}
            title="Transfer"
          />
          <SidebarItem
            isExpanded={isExpanded}
            href={"/dashboard/transaction"}
            icon={<TransactionsIcon />}
            title="Transactions"
          />
          <SidebarItem
            isExpanded={isExpanded}
            href={"/dashboard/p2p"}
            icon={<SendIcon />}
            title="P2P Transfer"
          />
        </div>
      </div>
      <div
        role="button"
        onClick={handleExpand}
        className={cn(
          "h-4 w-4 absolute right-0 mr-6",
          isMobile ? "block" : "hidden"
        )}
      >
        <Menu />
      </div>
    </>
  );
};
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );
}
function TransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}
export default Sidebar;

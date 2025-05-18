"use client";
import React, { useEffect, useRef, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import {
  ChevronLeft,
  Menu,
  HomeIcon,
  SendHorizonal,
  ArrowLeftRightIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { easeInOut, motion } from "motion/react";

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "100%" : "192px";
      sidebarRef.current.style.height = isMobile ? "100%" : "auto";
      sidebarRef.current.style.display = isMobile ? "block" : "hidden";
      sidebarRef.current.style.position = isMobile ? "absolute" : "";
    }
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "0";
      sidebarRef.current.style.height = "0";
      sidebarRef.current.style.position = "";
    }
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "0" : "192px";
      sidebarRef.current.style.height = isMobile ? "0" : "auto";
      sidebarRef.current.style.position = isMobile ? "absolute" :"";
    }
  }, [isMobile]);

  return (
    <>
      <motion.div
        animate={{ width: isMobile ? (isExpanded ? "100vw" : "0vw") : "192px" }}
        transition={{ duration: 0.3, ease: easeInOut }}
        ref={sidebarRef}
        className={cn(
          "bg-magnolia-200 h-full relative w-48 hidden md:flex flex-col",
          isMobile ?? "absolute"
        )}
      >
        {isExpanded && isMobile && (
          <div
            className={cn(
              "fixed right-0 mr-4 rounded-sm text-muted-foreground mt-2 p-1 bg-purple-300 hover:bg-purple-200 hover:text-purple-950 cursor-pointer"
            )}
            onClick={handleCollapse}
          >
            <ChevronLeft className="h-6 w-6 " />
          </div>
        )}

        <SidebarItem
          href={"/dashboard"}
          icon={HomeIcon}
          title="Home"
          isExpanded={isExpanded}
          handleCollapse={handleCollapse}
        />
        <SidebarItem
          isExpanded={isExpanded}
          href={"/dashboard/transfer"}
          icon={ArrowLeftRightIcon}
          title="Transfer"
          handleCollapse={handleCollapse}
        />
        <SidebarItem
          handleCollapse={handleCollapse}
          isExpanded={isExpanded}
          href={"/dashboard/transaction"}
          icon={SquareArrowOutUpRight}
          title="Transactions"
        />
        <SidebarItem
          handleCollapse={handleCollapse}
          isExpanded={isExpanded}
          href={"/dashboard/p2p"}
          icon={SendHorizonal}
          title="P2P Transfer"
        />
      </motion.div>
      {!isExpanded && isMobile && (
        <div
          role="button"
          onClick={handleExpand}
          className={cn(
            "p-1 absolute right-0 mr-6 mt-2 bg-purple-300 hover:bg-purple-700 hover:text-purple-200 rounded cursor-pointer"
          )}
        >
          <Menu className="h-6 w-6" />
        </div>
      )}
    </>
  );
};

export default Sidebar;

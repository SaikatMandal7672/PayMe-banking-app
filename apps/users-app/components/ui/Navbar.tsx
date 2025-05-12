"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="w-full px-4 py-2 flex justify-between items-center bg-white shadow-sm fixed">
      <p className="text-2xl font-semibold rounded rounded-bl-2xl">PayMe</p>

      {status === "loading" ? (
        <Button variant="ghost" disabled>
          <Loader className="h-4 w-4 animate-spin" />
        </Button>
      ) : session ? (
        <Button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          variant="outline"
        >
          Logout
        </Button>
      ) : (
        <Button asChild variant="default">
          <Link href="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;

"use client";

import { ReactNode } from "react";

interface ButrecieverNProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const ButrecieverN = ({
  children,
  className,
  appName,
}: ButrecieverNProps) => {
  return (
    <butrecieverN
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </butrecieverN>
  );
};

import React from "react";

interface WelcomeSectionProps {
  userName: string;
}

export const WelcomeSection = ({ userName }: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-magnolia-900 mb-2">
        Welcome back, {userName}!
      </h1>
      <p className="text-muted-foreground text-lg">
        Here&apos;s what&apos;s happening with your account today.
      </p>
    </div>
  );
};


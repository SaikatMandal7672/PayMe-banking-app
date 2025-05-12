
import React from "react";

interface AuthHeaderProps {
  heading: string;
  paragraph: string;
  linkText: string;
  linkUrl: string;
}

export function AuthHeader({ heading, paragraph, linkText, linkUrl }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-payme-400 to-payme-600 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-5 w-5 text-white"
            >
              <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
            </svg>
          </div>
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-payme-600 to-payme-800">
            PayMe
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {heading}
      </h1>
      <p className="text-sm text-muted-foreground">
        {paragraph}{" "}
        <a href={linkUrl} className="font-medium text-payme-600 hover:text-payme-500 underline-offset-4 hover:underline">
          {linkText}
        </a>
      </p>
    </div>
  );
}
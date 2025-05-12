
import React from "react";
import { AuthHeader } from "./AuthHeader";

interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  paragraph: string;
  linkText: string;
  linkUrl: string;
}

export function AuthLayout({ children, heading, paragraph, linkText, linkUrl }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row auth-gradient">
      {/* Left - Branding & Illustration (on medium screens and up) */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-10 bg-gradient-to-br from-payme-600 to-payme-800 text-white">
        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-payme-600"
              >
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
              </svg>
            </div>
            <div className="text-4xl font-bold">PayMe</div>
          </div>
          <h2 className="text-3xl font-bold">Simplify your payments</h2>
          <p className="text-payme-100 text-lg">
            Secure, fast, and convenient way to send and receive money online.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <h3 className="font-medium">Fast Transfers</h3>
              <p className="text-sm text-payme-100 mt-1">Send money within seconds</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3 className="font-medium">Secure</h3>
              <p className="text-sm text-payme-100 mt-1">Protected with encryption</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <h3 className="font-medium">Low Fees</h3>
              <p className="text-sm text-payme-100 mt-1">Transparent pricing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
              </svg>
              <h3 className="font-medium">Global</h3>
              <p className="text-sm text-payme-100 mt-1">Send money worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Auth Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl card-shadow animate-fade-in">
          <AuthHeader
            heading={heading}
            paragraph={paragraph}
            linkText={linkText}
            linkUrl={linkUrl}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
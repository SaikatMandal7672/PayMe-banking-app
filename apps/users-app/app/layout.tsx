import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProviders } from "@/components/ui/providers/sessionProvider";
import { Toaster } from "@/components/ui/sonner"



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PayMe App",
  description: "Payments app to pay me the money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProviders>
          {children}
          <Toaster richColors/>
        </SessionProviders>
      </body>
    </html>
  );
}


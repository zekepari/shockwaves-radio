import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { WebSocketProvider } from "@/contexts/WebSocketContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shockwaves Radio",
  description: "Online Radio Station that is ran by a community of music-enthusiasts and volunteer radio hosts, providing you with the top-quality songs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <WebSocketProvider>
        <body data-theme="night"
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-r from-indigo-950 to-slate-800 to-60% space-y-16`}
          >
              <Navbar/>
              {children}
          </body>
        </WebSocketProvider>
      </SessionProvider>
    </html>
  );
}

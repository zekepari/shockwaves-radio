import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import Footer from "@/components/Footer";
import { NowPlayingData } from "@/types/Music";
import Image from "next/image";
import Link from "next/link";
import { splitAds } from "@/lib/Ads";

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

async function fetchInitialData(): Promise<NowPlayingData | null> {
  try {
    const response = await fetch(
      "https://vh-azura01.radio.volthosting.co.uk/api/nowplaying/shockwaves_radio"
    );
    const data = await response.json();
    return data as NowPlayingData;
  } catch (error) {
    console.error("Error fetching initial Now Playing data:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialData = await fetchInitialData();
  const { leftAds, rightAds } = splitAds();

  return (
    <html lang="en">
      <SessionProvider>
        <WebSocketProvider initialData={initialData}>
        <body data-theme="night"
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-blue-900 to-slate-800 to-60%`}
          >
            <main className="min-h-screen space-y-16 mb-16">
              <Navbar />
              {children}
            </main>
            <Footer />
          </body>
        </WebSocketProvider>
      </SessionProvider>
    </html>
  );
}

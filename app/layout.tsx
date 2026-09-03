import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الخلاط | The Mixer - 3D Fresh Juice & Smoothie Experience",
  description: "Experience the next evolution of fresh cold-pressed smoothies & juices. 30,000 RPM hydro-vortex technology for ultra-smooth texture and 100% natural nutrition.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080c10] text-slate-100 selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}


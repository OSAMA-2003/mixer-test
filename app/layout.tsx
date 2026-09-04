import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "الخلاط | The Mixer - سوهاج",
  description: "الخلاط | The Mixer - أحلى خلطات طبيعية 100% في سوهاج. عصائر فريش، سموذي، ميلك شيك، وموخيتو بطريقة مبتكرة في قلب سوهاج.",
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
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-[#fab818] selection:text-[#015f70]">
        {children}
      </body>
    </html>
  );
}



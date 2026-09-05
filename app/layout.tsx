import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
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
      className={`${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-[#fab818] selection:text-[#015f70]">
        {children}
      </body>
    </html>
  );
}



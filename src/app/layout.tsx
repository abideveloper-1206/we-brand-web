import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CustomCursor from "@/components/CustomCursor";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Brand Media — Digital Marketing Agency",
  description: "We Brand Media is a creative branding and digital marketing agency based in Coimbatore, helping startups, local businesses, entrepreneurs, educational institutions, and growing brands build a strong digital presence.",
  icons: {
    icon: '/favicon.webp',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
        <CustomCursor />
      </body>
    </html>
  );
}

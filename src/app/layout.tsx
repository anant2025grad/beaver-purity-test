
import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Beaver Purity Test",
  description:
    "100 questions. One campus. How innocent are you?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
        <Analytics />
        <AnalyticsProvider />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/widgets/Header";
import Sidebar from "@/widgets/Sidebar";
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
  title: "Control Panel",
  description: "Control panel of Gamble project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex-1">
          <Sidebar>
            <Header>{children}</Header>
          </Sidebar>
        </main>
      </body>
    </html>
  );
}

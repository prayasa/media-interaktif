import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Media Interaktif",
  description: "Portal Pembelajaran Mata Kuliah SMI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900`}>
        <Navbar />
        
        {/* Main content wrapper */}
        <div className="flex-1 w-full">
          {children}
        </div>
        
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
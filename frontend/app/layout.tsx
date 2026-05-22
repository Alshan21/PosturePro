import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Posture Pro | AI Posture Analysis",
  description:
    "Upload workout videos and get instant AI-powered posture feedback with MediaPipe vision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-canvas font-sans text-ink antialiased"
      >
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[100]" aria-hidden />
        <Navbar />
        <main className="relative z-0 min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StarBiz — Cosmic Central Hub (Companion PWA)",
  description:
    "Official digital companion app for the StarBiz physical board game. Electronic 1d15 dice, galactic lottery console, market appreciation matrix, and StarCards.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StarBiz",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070817",
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${orbitron.variable} ${rajdhani.variable} ${inter.variable}`}
    >
      <body className="min-h-screen w-full bg-[#04040c] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}

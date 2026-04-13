import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Umer — Full-Stack Developer & Roboticist",
  description:
    "Final-year CS student at FAST NUCES Islamabad. Building full-stack web apps and autonomous robots.",
  keywords: ["developer", "robotics", "full-stack", "Next.js", "ROS2", "portfolio"],
  authors: [{ name: "Muhammad Umer" }],
  openGraph: {
    title: "Muhammad Umer — Full-Stack Developer & Roboticist",
    description: "Full-stack developer and roboticist based in Islamabad.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--background)] text-[var(--on-background)] antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

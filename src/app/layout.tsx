import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/navbar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "sonner";
import {ReactNode} from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Osad FWD Gddkia",
  description: "Obsługa Systemu Akwizycji Danych FWD (OSAD FWD GDDKiA)",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />
          {children}
          <TailwindIndicator />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

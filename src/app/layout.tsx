import type { Metadata } from "next";
import "./globals.css";
import ResetUniverseOnLoad from "./reset-universe-on-load";
export const metadata: Metadata = { title: "GEOPRIX Motorsport", description: "Global motorsport universe management system." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><ResetUniverseOnLoad />{children}</body></html>;
}

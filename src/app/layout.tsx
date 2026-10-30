import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GEOPRIX Motorsport", description: "Global motorsport universe management system." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

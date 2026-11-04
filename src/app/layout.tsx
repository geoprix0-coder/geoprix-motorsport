import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEOPRIX | World Motorsport",
  description: "Um universo mundial de automobilismo de monopostos, conectado e administrado pelo GEOPRIX.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

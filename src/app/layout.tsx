import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { GlobalIntroLoader } from "@/components/providers/GlobalIntroLoader";
import { ArchitecturalGrid } from "@/components/layout/architectural-grid";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

/* Body font — closest Google Fonts match to Aeonik */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

/* Display/title font — closest Google Fonts match to Agrandir Grand */
const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "W.VIANA — Arquitetura e Interiores",
  description:
    "Escritório de arquitetura e interiores fundado por Wellington Viana. Soluções personalizadas que elevam experiências e expectativas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${dmSans.variable} bg-background text-foreground antialiased`}
      >
        <GlobalIntroLoader />
        <ArchitecturalGrid />
        <QueryProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

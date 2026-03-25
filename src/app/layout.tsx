import type { Metadata } from "next";
import localFont from "next/font/local";
import { GlobalIntroLoader } from "@/components/providers/GlobalIntroLoader";
import { ArchitecturalGrid } from "@/components/layout/architectural-grid";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

/* Body font — Aeonik (brand manual) */
const aeonik = localFont({
  src: [
    {
      path: "../fonts/AeonikTRIAL-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/AeonikTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AeonikTRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

/* Display/title font — Agrandir Grand (brand manual) */
const agrandirGrand = localFont({
  src: [
    {
      path: "../fonts/Agrandir-GrandLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Agrandir-GrandHeavy.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "W.VIANA — Arquitetura | Interiores",
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
        className={`${aeonik.variable} ${agrandirGrand.variable} bg-background text-foreground antialiased`}
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

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const petrona = localFont({
  src: [
    {
      path: "../public/fonts/Petrona-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/fonts/Petrona-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elm Standard — Custom radiator covers, handbuilt to fit",
  description:
    "Custom radiator covers built to your radiator's exact size. Three styles, three screens, your trim color. Local install across Greater Boston or flat-pack shipping anywhere in the US.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${petrona.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

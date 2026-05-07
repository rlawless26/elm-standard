import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Petrona } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const petrona = Petrona({
  subsets: ["latin"],
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
  title: "Elm Standard — Custom radiator covers, handbuilt in Milton, MA",
  description:
    "Custom radiator covers, handbuilt in Milton, MA. One pair of hands, one shop.",
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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.css";
import { Cabecera } from "@/components/layout/Cabecera";
import { SearchLayout } from "@/components/layout/SearchLayout";
import { CategoriasLayout } from "@/components/layout/CategoriasLayout";
import Footer from "@/components/layout/Footer";
import { fetchServerPg } from "@/lib/fetchServerPg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MunayTech Ecommerce",
  description: "Ecommerce de MunayTech",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetchServerPg("/product/categoryall", "GET");
  console.log(data);
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-publicSans background-gradient  `}
      >
        <main className="w-full mx-auto flex flex-col min-h-screen bg-white">
          <Cabecera />
          <SearchLayout />
          <CategoriasLayout />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

"use client";

import React from "react";
import { Inter } from "next/font/google";
import Navigation from "./Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} min-h-screen flex flex-col bg-[#f2f2f23b] font-publicSans`}
    >
      {/* Contenedor limitado a 1600px */}
      <div className="w-full max-w-[1600px] mx-auto flex min-h-screen bg-gray-50">
        {/* Sidebar a la izquierda */}
        <div className="w-72 p-4">
          <Navigation />
        </div>

        {/* Contenido principal a la derecha */}
        <div className="flex-1 p-6">
          <main className="flex-1 text-black">{children}</main>
        </div>
      </div>

      <footer className="text-center p-4 bg-gray-200">© 2025 Munay Tech</footer>
    </div>
  );
}

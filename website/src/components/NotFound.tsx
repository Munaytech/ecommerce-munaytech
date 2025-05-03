import Link from "next/link";
import React from "react";

export const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col h-full justify-center items-center m-auto w-full text-center px-4 bg-white text-gray-600">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">Producto no encontrado</p>
      <p className="text-sm text-gray-500">
        Lo sentimos, no pudimos encontrar el producto que buscabas.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="px-6 py-3 text-white bg-primary rounded-lg shadow hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
      <div className="mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-72 h-72 mx-auto text-gray-500"
        >
          <circle cx="32" cy="32" r="30" className="text-gray-300" />
          <path d="M32 20v12m0 8h.01" />
          <circle cx="32" cy="32" r="30" />
        </svg>
      </div>
    </div>
  );
};

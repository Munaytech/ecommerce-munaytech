import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="w-72 p-6 bg-white rounded-2xl shadow-sm">
      <div className="text-xs text-gray-400 font-semibold mb-4">DASHBOARD</div>

      <ul className="space-y-4">
        <li className="flex items-center justify-between text-red-500 font-semibold">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🛍️</span>{" "}
            {/* Puedes cambiar a un ícono real */}
            <Link href={"/user/ordenes"}>
              <span>Ordenes</span>
            </Link>
          </div>
          <span>5</span>
        </li>
        {/* <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🤍</span>
            <Link href={"/user/favoritos"}>
              <span>Favoritos</span>
            </Link>
          </div>
          <span>19</span>
        </li> */}
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎧</span>
            <Link href={"/user/soporte"}>
              <span>Soporte</span>
            </Link>
          </div>
          <span>1</span>
        </li>
      </ul>

      <div className="text-xs text-gray-400 font-semibold mt-8 mb-4">
        ACCOUNT SETTINGS
      </div>

      <ul className="space-y-4">
        <li className="flex items-center text-gray-500 hover:text-black transition space-x-2">
          <span className="text-xl">👤</span>
          <Link href={"/user/perfil"}>
            <span>Perfil</span>
          </Link>
        </li>
        <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📍</span>
            <Link href={"/user/direcciones"}>
              <span>Direcciones</span>
            </Link>
          </div>
          <span>16</span>
        </li>
        {/* <li className="flex items-center justify-between text-gray-500 hover:text-black transition">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💳</span>
            <Link href={"/user/payment"}>
              <span>Metodos de Pago</span>
            </Link>
          </div>
          <span>4</span>
        </li> */}
      </ul>
    </div>
  );
};

export default Navigation;

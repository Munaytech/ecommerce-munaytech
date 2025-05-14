"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/user/ordenes",
      icon: "🛍️",
      label: "Ordenes",
      count: 5,
    },
    {
      href: "/user/soporte",
      icon: "🎧",
      label: "Soporte",
      count: 1,
    },
    {
      href: "/user/perfil",
      icon: "👤",
      label: "Perfil",
    },
    {
      href: "/user/direcciones",
      icon: "📍",
      label: "Direcciones",
      count: 16,
    },
  ];

  return (
    <div className="w-72 p-6 bg-white rounded-2xl shadow-sm">
      <div className="text-xs text-gray-400 font-semibold mb-4">DASHBOARD</div>

      <ul className="space-y-4">
        {navItems.slice(0, 2).map(({ href, icon, label, count }) => (
          <li
            key={href}
            className={`flex items-center justify-between ${
              pathname === href
                ? "text-red-500 font-semibold"
                : "text-gray-500 hover:text-black"
            } transition`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{icon}</span>
              <Link href={href}>
                <span>{label}</span>
              </Link>
            </div>
            {count !== undefined && <span>{count}</span>}
          </li>
        ))}
      </ul>

      <div className="text-xs text-gray-400 font-semibold mt-8 mb-4">
        ACCOUNT SETTINGS
      </div>

      <ul className="space-y-4">
        {navItems.slice(2).map(({ href, icon, label, count }) => (
          <li
            key={href}
            className={`flex items-center justify-between ${
              pathname === href
                ? "text-red-500 font-semibold"
                : "text-gray-500 hover:text-black"
            } transition`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{icon}</span>
              <Link href={href}>
                <span>{label}</span>
              </Link>
            </div>
            {count !== undefined && <span>{count}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;

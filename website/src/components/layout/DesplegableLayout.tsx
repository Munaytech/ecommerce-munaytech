"use client";
import { useState, useRef, useEffect } from "react";
import { User, Settings, Info } from "lucide-react";
import { FashionIcon } from "@/components/icons/menu";
import { OpcionIcon } from "@/components/icons";
import Link from "next/link";

interface MenuData {
  menuname: string;
  menuselection: { label: string; link: string }[];
}

export default function DesplegableLayout({
  dataMenu,
}: {
  dataMenu: MenuData;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((v) => !v);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const dataMenu = {
  //   menuname: "Categorías",
  //   menuselection: [
  //     { label: "Perfil" },
  //     { label: "Ajustes" },
  //     { label: "Info" },
  //   ],
  // };

  return (
    <div className="relative  " ref={menuRef}>
      {/* Botón principal */}
      <div
        onClick={toggle}
        className="w-full flex items-center gap-x-4 py-3 px-4 text-secundary rounded-md text-left font-medium hover:text-primary "
      >
        <div className="flex items-center justify-start gap-x-4">
          {dataMenu?.menuname}
        </div>{" "}
        <span
          className={`inline-block transform transition-transform duration-400 ease-in-out ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <OpcionIcon />
        </span>
      </div>

      {/* Contenedor de ítems */}
      <ul
        className={`borderone bg-white z-10 my-2 absolute left-0 top-full w-64 origin-top transform transition-all duration-100 ease-in-out ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {dataMenu?.menuselection?.map((item, i) => (
          <Link key={i} href={item.link || "/"}>
            <li className="flex items-center space-x-2 py-2 px-4 group hover:bg-gray-100 cursor-pointer ">
              <span className="text-gray-700 transition-colors duration-200 ease-in-out group-hover:text-primary ">
                {item.label}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

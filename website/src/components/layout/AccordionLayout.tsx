"use client";
import { useState, useRef, useEffect } from "react";
import { Home, User, Settings, Info } from "lucide-react";
import { FashionIcon } from "@/shared/icons/menu";
import { CategoriaIcon, OpcionIcon } from "@/shared/icons";

export default function AccordionLayout() {
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

  return (
    <div className="w-64 relative" ref={menuRef}>
      {/* Botón principal */}
      <div
        onClick={toggle}
        className="w-full flex items-center justify-between py-3 px-4 text-secundary bg-[#F6F9FC] rounded-md text-left font-medium "
      >
        <div className="flex items-center justify-start gap-x-4">
          <CategoriaIcon />
          Categorías
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
        className={`borderone bg-white z-10 my-2 absolute left-0 top-full w-full origin-top transform transition-all duration-300 ease-in-out ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {[
          {
            icon: (
              <FashionIcon className="text-[#2B3445] transition-colors duration-700 ease-in-out group-hover:text-primary" />
            ),
            label: "Inicio",
          },
          { icon: <User className="w-5 h-5" />, label: "Perfil" },
          { icon: <Settings className="w-5 h-5" />, label: "Ajustes" },
          { icon: <Info className="w-5 h-5" />, label: "Info" },
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-center space-x-2 py-2 px-4 group hover:bg-gray-100 cursor-pointer "
          >
            {item.icon}
            <span className="text-gray-700 transition-colors duration-700 ease-in-out group-hover:text-primary ">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

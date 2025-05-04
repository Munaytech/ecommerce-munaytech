"use client";
import { useState, useRef, useEffect } from "react";
import { Home, User, Settings, Info, ChevronRight } from "lucide-react";
import { FashionIcon } from "@/shared/icons/menu";
import { CategoriaIcon, OpcionIcon } from "@/shared/icons";

interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  child?: MenuItem[] | null;
}

export default function AccordionLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((v) => !v);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items: MenuItem[] = [
    {
      icon: <FashionIcon />,
      label: "Fashion",
      child: [
        { label: "Man Clothes" },
        { label: "Woman Clothes" },
        {
          label: "Accessories",
          child: [
            { label: "Man Clothes" },
            { label: "Woman Clothes" },
            { label: "Accessories" },
          ],
        },
      ],
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Perfil",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Ajustes",
      child: [{ label: "General" }, { label: "Privacidad" }],
    },
    {
      icon: <Info className="w-5 h-5" />,
      label: "Info",
    },
  ];

  return (
    <div className="w-64 relative z-50" ref={menuRef}>
      {/* Botón principal */}
      <div
        onClick={toggle}
        className="w-full flex items-center justify-between py-3 px-4 text-secundary bg-[#F6F9FC] rounded-md text-left font-medium cursor-pointer"
      >
        <div className="flex items-center gap-x-4">
          <CategoriaIcon />
          Categorías
        </div>
        <span
          className={`inline-block transform transition-transform duration-400 ease-in-out ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          <OpcionIcon />
        </span>
      </div>

      {/* Lista de ítems */}
      <ul
        className={`borderone bg-white my-2 absolute left-0 top-full w-full origin-top transform transition-all duration-300 ease-in-out ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {items.map((item, i) => (
          <li key={i} className="group relative">
            <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-x-2">
                {item.icon}
                <span className="text-gray-700 group-hover:text-primary transition-colors duration-300">
                  {item.label}
                </span>
              </div>

              {item.child && (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
              )}
            </div>

            {/* Submenú */}
            {item.child && (
              <ul className="absolute top-0 left-full bg-white border rounded shadow-md min-w-[180px] transform scale-95 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-20">
                {item.child.map((child, j) => (
                  <li
                    key={j}
                    className="group/menu relative px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 whitespace-nowrap hover:text-primary flex items-center justify-between"
                  >
                    {child.label}
                    <div className="flex items-center justify-between  hover:bg-gray-100 cursor-pointer">
                      {child.child && (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover/menu:text-primary" />
                      )}
                    </div>
                    {child.child && (
                      <ul className="absolute top-0 left-full bg-white border rounded shadow-md min-w-[180px] transform scale-95 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:scale-100 group-hover/menu:pointer-events-auto transition-all duration-300 z-20">
                        {child.child.map((childs, j) => (
                          <li
                            key={j}
                            className="group/menu px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 whitespace-nowrap hover:text-primary flex items-center justify-between"
                          >
                            {childs.label}
                            <div className="flex items-center justify-between  hover:bg-gray-100 cursor-pointer">
                              {childs.child && (
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover/menu:text-primary" />
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

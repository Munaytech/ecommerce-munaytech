import React from "react";
import AccordionLayout from "./AccordionLayout";
import DesplegableLayout from "./DesplegableLayout";

export const CategoriasLayout = () => {
  return (
    <div>
      <div className="w-[1500px] m-auto my-2 flex items-center justify-between ">
        <div>
          <AccordionLayout />
        </div>
        <div className="flex items-center justify-center">
          {menuList.map((item, index) => {
            return (
              <div key={index}>
                <DesplegableLayout dataMenu={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-screen h-px bg-gray-100"></div>
    </div>
  );
};

const menuList = [
  {
    menuname: "Categorías",
    menuselection: [
      { label: "Perfil", link: "/" },
      { label: "Ajustes", link: "/" },
      { label: "Info", link: "/" },
    ],
  },
  {
    menuname: "Usuario",
    menuselection: [
      { label: "Perfil", link: "/user/perfil" },
      { label: "Ajustes", link: "/" },
      { label: "Info", link: "/" },
    ],
  },
  {
    menuname: "Vendedor",
    menuselection: [
      { label: "Item1", link: "/" },
      { label: "Item2", link: "/" },
      { label: "Item2", link: "/" },
    ],
  },
];

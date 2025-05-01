import { Facebook, Instagram, SumaIcon, Twiter } from "@/shared/icons";
import React from "react";

export const Cabecera = () => {
  return (
    <div className="bg-secundary">
      <div className="max-w-[1500px] m-auto text-white py-1 flex justify-between items-center px-2  ">
        <div className="flex items-center justify-center text-sm gap-x-4">
          <p className="bg-primary rounded-2xl py-1 px-3  font-semibold">HOT</p>
          <p>Free Express MUNAYTECH</p>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center justify-center gap-x-4 text-sm">
            <Twiter />
            <Facebook />
            <Instagram />
          </div>
        </div>
        <div className="block sm:hidden">
          <SumaIcon />
        </div>
      </div>
    </div>
  );
};

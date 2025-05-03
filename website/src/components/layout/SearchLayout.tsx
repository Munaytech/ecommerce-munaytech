"use client";
import {
  BazarIcon,
  BolsoIcon,
  LupaIcon,
  MenuIcon,
  UserIcon,
} from "@/shared/icons";
import React, { useState } from "react";
import { FashionIcon } from "@/shared/icons/menu/FashionIcon";
import AccordionLayout from "./AccordionLayout";
import Link from "next/link";
import { LogoIcon } from "@/shared/icons/LogoIcon";
import { Menu } from "lucide-react";
export const SearchLayout = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="max-w-[1500px]  w-full mx-auto px-6 text-white py-2 flex justify-between items-center  ">
      <div className="md:hidden">
        <MenuIcon />
      </div>
      <div className="hidden md:block">
        <Link href={"/"}>
          <BazarIcon />
        </Link>
      </div>
      <div className="md:hidden">
        <Link href={"/"}>
          <LogoIcon />
        </Link>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center w-full max-w-md">
          <div
            className="flex items-center w-full bg-gray-100 rounded-md border border-gray-300
        transition-colors hover:border-black focus-within:!border-red-500"
          >
            <div className="">
              <LupaIcon />
            </div>
            <input
              type="text"
              placeholder="Searching for..."
              className="flex-1 py-2 bg-gray-100 outline-none placeholder-gray-400"
            />
            <div className="px-3 text-sm text-gray-500 cursor-pointer">
              All Categories ▼
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        <div className="md:hidden">
          <LupaIcon />
        </div>
        <UserIcon />
        <div className="relative">
          <BolsoIcon />
          <span className="absolute -top-4 -right-4 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
        {/* <div>
          <BolsoIcon />
        </div> */}
      </div>
    </div>
  );
};

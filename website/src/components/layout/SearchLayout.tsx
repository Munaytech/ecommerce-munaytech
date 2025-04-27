"use client";
import { BazarIcon } from "@/shared/icons";
import React, { useState } from "react";
import { FashionIcon } from "@/shared/icons/menu/FashionIcon";
import AccordionLayout from "./AccordionLayout";
import Link from "next/link";
export const SearchLayout = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="w-[1500px] m-auto text-white py-1 flex justify-between items-center  ">
      <Link href={"/"}>
        <BazarIcon />
      </Link>
      <div>
        <div className="flex items-center w-full max-w-md">
          <div
            className="flex items-center w-full bg-gray-100 rounded-md border border-gray-300
        transition-colors hover:border-black focus-within:!border-red-500"
          >
            <div className="px-3 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
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
      <div className="bg-red-400">
        <AccordionLayout />
        {/* <FashionIcon /> */}
      </div>
    </div>
  );
};

import { InsigniaIcon } from "@/shared/icons";
import Image from "next/image";
import React from "react";

export const Rating = () => {
  const productos = [
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
    {
      name: "Sunglass",
      price: "$150.00",
      image: "/image2.png",
    },
  ];
  return (
    <div className="w-full max-w-[1500px] mx-auto relative px-4 mb-10">
      <div className="flex items-center  mb-4">
        <InsigniaIcon />
        <p className="text-[25px] leading-9 font-semibold text-secundary">
          Top Ratings
        </p>
      </div>
      <div className="borderone grid grid-cols-6 justify-around">
        {productos.map((producto, index) => (
          <div
            key={index}
            className=" col-span-3 md:col-span-1 flex flex-col items-center justify-center  px-8"
          >
            <div className="mb-2 group">
              <Image
                src={producto.image}
                alt="Image"
                width={300}
                height={300}
                className="sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl transition duration-300 group-hover:brightness-90"
              />
            </div>
            <p className="text-secundary text-[14px] font-medium leading-6 mb-1 text-left w-full">
              {producto.name}
            </p>
            <p className="text-primary text-[14px] font-medium leading-6 text-left w-full">
              {producto.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

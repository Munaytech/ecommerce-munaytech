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
    <div className="w-full max-w-[1500px] mx-auto relative mt-10">
      <div className="flex items-center">
        <InsigniaIcon />
        <p className="text-[25px] leading-9 font-semibold text-secundary">
          Top Ratings
        </p>
      </div>
      <div className="borderone flex gap-4 justify-around">
        {productos.map((producto, index) => (
          <div key={index} className="">
            <div className="mb-2 group">
              <Image
                src={producto.image}
                alt="Image"
                width={300}
                height={300}
                className="rounded-xl transition duration-300 group-hover:brightness-90"
              />
            </div>
            <p className="text-secundary text-[14px] font-medium leading-6 mb-1">
              {producto.name}
            </p>
            <p className="text-primary text-[14px] font-medium leading-6">
              {producto.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

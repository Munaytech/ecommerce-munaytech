import StarRating from "@/shared/components/stars/Stars";
import { CruzIcon, EyeIcon, HeartIcon } from "@/shared/icons";
import Image from "next/image";
import React from "react";

export const ProductList = ({ product }: any) => {
  const producto = product || {
    name: "iPhone 13 Pro Max",
    price: "$108.00",
    oldPrice: "$150.00",
    discount: "28% off",
    image: "/image.png",
  };
  return (
    <div>
      <div className="group relative bg-white border rounded-lg shadow-md p-4 flex items-center justify-between ">
        <div className="relative h-36 flex items-center justify-center overflow-hidden mt-4">
          <Image
            src={producto.image}
            alt={producto.name}
            width={200}
            height={200}
            className="object-cover transition-transform duration-300 group-hover:scale-90"
          />
        </div>
        <div className="border-l border-[#F3F5F9] p-4 w-full flex flex-col items-start justify-between">
          <p className="my-2 inline-flex bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
            {producto.discount}
          </p>
          <h3 className="my-2 text-tertiary text-base text-[14px] font-medium leading-5">
            {producto.name}
          </h3>
          <div className="my-2">
            <StarRating rating={4.5} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-primary font-semibold text-base text-[14px] leading-5">
                {producto.price}
              </p>
              <p className="text-gray-400 font-medium text-base text-[12px] line-through leading-4">
                {producto.oldPrice}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 ">
          <div className="hover:bg-gray-100 p-2 rounded-2xl transition-all duration-200">
            <EyeIcon />
          </div>
          <div className="hover:bg-gray-100 p-2 rounded-2xl transition-all duration-200">
            <HeartIcon />
          </div>

          <button className="border border-primary  text-white w-6 h-6 flex items-center justify-center rounded-lg ">
            <CruzIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

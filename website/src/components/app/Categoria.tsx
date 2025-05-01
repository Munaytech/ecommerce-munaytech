"use client";
import { CategoriaIcon } from "@/shared/icons";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export const Categoria = () => {
  const productos = [
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
    {
      name: "Headphone",
      orders: "3k orders this week",
      image: "/imageone.png",
    },
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto px-4 relative mt-10">
      <div className="flex items-center  mb-4">
        <CategoriaIcon />
        <p className="text-[25px] leading-9 font-semibold text-secundary">
          Top Categories
        </p>
      </div>
      <div className="relative" >
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={false}
          spaceBetween={20}
          slidesPerView={3}
          className="relative"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {productos.map((producto, index) => (
            <SwiperSlide key={index}>
              <div className="relative borderone bg-white group h-[200px] items-center justify-center flex flex-col">
                <div className="relative w-full  ">
                  <div className="transition duration-300">
                    <Image
                      src={producto.image}
                      alt="headphone"
                      width={500}
                      height={400}
                      className="rounded-xl transition duration-300 group-hover:brightness-90"
                    />
                  </div>
                  <div className=" absolute top-10 w-full flex items-center justify-between px-2 text-[11px]  font-semibold leading-4">
                    <span className="bg-secundary text-white rounded-xl px-4 py-1">
                      {producto.name}
                    </span>
                    <span className="bg-white text-secundary rounded-xl px-4 py-1">
                      {producto.orders}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botones de navegación personalizados */}
        <div className="hidden swiper-button-prev1 custom-prev absolute left-[-25px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12  md:flex items-center justify-center shadow-lg cursor-pointer z-10">
          ❮
        </div>
        <div className="hidden swiper-button-next1 custom-next absolute right-[-25px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12 md:flex items-center justify-center shadow-lg cursor-pointer z-10">
          ❯
        </div>
        {/* <div className="hidden swiper-button-prev custom-prev absolute left-[-25px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12 md:flex items-center justify-center shadow-lg cursor-pointer z-10">
        ❮
      </div>
      <div className="hidden swiper-button-next custom-next absolute right-[-25px] top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12 md:flex items-center justify-center shadow-lg cursor-pointer z-10">
        ❯
      </div> */}
      </div>
    </div>
  );
};

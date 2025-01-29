"use client";
import Image from "next/image";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { AnimationSwiper } from "@/shared/components/animation/AnimationSwiper";

export const Oferta = () => {
  const ofertas = [
    {
      title: "50% Off For Your First Shopping ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convalliss.",
      image: "/image.png",
    },
    {
      title: "30% Off On Sports Shoes",
      description:
        "Get the best quality sports shoes at an amazing discount. Limited stock available!",
      image: "/image.png",
    },
    {
      title: "Buy One Get One Free!",
      description:
        "Exclusive deal on selected products. Don't miss out on this great offer.",
      image: "/image.png",
    },
  ];
  return (
    <div className="w-[1500px] m-auto relative  ">
      <div>
        <AnimationSwiper>
          {ofertas.map((oferta, index) => (
            <SwiperSlide key={index}>
              <div className=" relative grid grid-cols-3 gap-6ss h-[350px] justify-center">
                <div className="col-span-1">
                  <p className="text-supertitle mb-8">{oferta.title}</p>
                  <p className="text-paragraph mb-6">{oferta.description}</p>
                  <button className="text-sm bg-primary rounded-xl px-8 py-3 text-white">
                    Shop Now
                  </button>
                </div>
                <div className="relative col-span-2">
                  <Image
                    src={oferta.image}
                    alt="hero"
                    fill
                    className="relative object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </AnimationSwiper>
      </div>
      <div className="custom-pagination flex justify-center"></div>
    </div>
  );
};

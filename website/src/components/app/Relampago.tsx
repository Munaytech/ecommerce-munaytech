"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CruzIcon, EyeIcon, FlashIcon, HeartIcon } from "@/components/icons";
import StarRating from "@/components/shared/stars/Stars";
import { productosList } from "@/data/products";

export const Relampago = () => {
  const productos = productosList;

  return (
    <div className="w-full max-w-[1500px] px-4 md:mx-auto relative mb-8">
      <div className="flex items-center  mb-4">
        <FlashIcon />
        <p className="text-[25px] leading-9 font-semibold text-secundary">
          Flash Deals
        </p>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next1",
          prevEl: ".swiper-button-prev1",
        }}
        loop={false}
        spaceBetween={20}
        slidesPerView={4}
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
            <div className="group relative bg-white border rounded-lg shadow-md p-4 ">
              {/* Etiqueta de descuento */}
              <div className="flex justify-between items-start">
                <p className="inline-flex bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                  {producto.discount}
                </p>
                <div className="flex flex-col items-center gap-y-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <div className="hover:bg-gray-100 p-2 rounded-2xl transition-all duration-200">
                    <EyeIcon />
                  </div>
                  <div className="hover:bg-gray-100 p-2 rounded-2xl transition-all duration-200">
                    <HeartIcon />
                  </div>
                </div>
              </div>
              <div className="relative w-full h-56 flex items-center justify-center overflow-hidden mt-4">
                <Image
                  src={producto.image}
                  alt={producto.name}
                  width={300}
                  height={300}
                  className="object-cover transition-transform duration-300 group-hover:scale-90"
                />
              </div>

              <div className="border-t border-[#F3F5F9] p-4">
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

                  <button className="border border-primary  text-white w-6 h-6 flex items-center justify-center rounded-lg ">
                    <CruzIcon />
                  </button>
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
    </div>
  );
};

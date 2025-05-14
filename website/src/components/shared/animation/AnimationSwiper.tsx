import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface AnimationSwiperProps {
  children: React.ReactNode;
}

export const AnimationSwiper: React.FC<AnimationSwiperProps> = ({
  children,
}) => {
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        loop={true}
        className="w-full"
      >
        {children}
      </Swiper>
    </div>
  );
};

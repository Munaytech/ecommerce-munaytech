"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import StarRating from "@/shared/components/stars/Stars";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Information = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png",
    "/images/image4.png",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setSelectedImage(newIndex),
  };
  return (
    <div className="max-w-[1500px] mx-auto grid grid-cols-2 gap-8 p-8 items-start">
      {/* Image Slider */}
      <div className="col-span-1 flex flex-col items-center">
        <Slider ref={sliderRef} {...settings} className="w-full max-w-[600px]">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center w-full max-w-[600px] aspect-[1/1] bg-gray-100"
            >
              <Image
                src={img}
                alt={`Product Image ${index}`}
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail Navigation */}
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              className={`border-2 ${
                selectedImage === index ? "border-red-500" : "border-gray-300"
              } p-1 rounded flex items-center`}
              onClick={() => {
                setSelectedImage(index);
                if (sliderRef.current) {
                  sliderRef.current.slickGoTo(index);
                }
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index}`}
                width={50}
                height={50}
                className="rounded"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="col-span-1">
        <h2 className="text-3xl  text-secundary font-semibold">
          Mapple Earphones
        </h2>
        <div className="flex items-center my-2">
          <span className="text-sm text-secundary mr-2">Rated:</span>
          <StarRating rating={4.1} />
          <span className="ml-2">(4.1)</span>
        </div>

        <div className="my-4">
          <p className="text-sm font-medium text-secundary mr-2 mb-2">Option</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Option 1
            </button>
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Option 1
            </button>
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Option 1
            </button>
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Option 1
            </button>
          </div>
        </div>

        <div className="my-8">
          <p className="text-sm font-medium text-secundary mr-2 mb-2">Type</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Type 1
            </button>
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Type 2
            </button>
            <button className="rounded-lg border border-[#DAE1E7] text-secundary px-3 py-2 hover:bg-gray-200">
              Type 3
            </button>
          </div>
        </div>
        <p className="text-2xl font-semibold text-primary">$199.00</p>
        <p className="text-secundary">Stock Available</p>
        <button className="bg-primary rounded-xl text-white px-10 py-4 mt-4 mb-6">
          Add to Cart
        </button>
        <p className="mt-4 text-secundary">
          Sold By: <span className="font-semibold">Anytime Buys</span>
        </p>
      </div>
    </div>
  );
};

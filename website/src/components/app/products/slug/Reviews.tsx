import StarRating from "@/shared/components/stars/Stars";
import Image from "next/image";
import React from "react";

export const Reviews = () => {
  const reviews = [
    {
      name: "Jannie Schumm",
      rating: 4.7,
      time: "4 years ago",
      image: "/images/image1.png",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis.",
    },
    {
      name: "Joe Kenan",
      rating: 4.7,
      time: "5 years ago",
      image: "/images/image1.png",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis.",
    },
    {
      name: "Jenifer Tulio",
      rating: 4.7,
      time: "4 years ago",
      image: "/images/image1.png",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis.",
    },
  ];
  return (
    <div className="p-4 space-y-6">
      {reviews.map((review, index) => (
        <div key={index} className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-x-4">
            <Image
              src={review.image}
              alt={review.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="text-secundary">
              <h3 className="font-semibold">{review.name}</h3>
              <div className="flex items-center ">
                <StarRating rating={review.rating} />
                <span className="ml-2 font-medium ">
                  {review.rating} • {review.time}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

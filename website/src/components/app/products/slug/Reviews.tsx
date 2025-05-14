import StarRating from "@/components/shared/stars/Stars";
import { formatDateToPeru } from "@/shared/utils";
import Image from "next/image";
import React from "react";
import { MessageSquare } from "lucide-react"; // ícono opcional si usas lucide

export const Reviews = ({ reviews = [] }: { reviews: any[] }) => {
  const noReviews = reviews?.length === 0 || reviews === null;

  return (
    <div className="p-4 space-y-6">
      {noReviews ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10 border rounded-lg shadow-sm bg-gray-50">
          <MessageSquare className="w-10 h-10 mb-2 text-primary" />
          <p className="text-lg font-medium">Aún no hay reseñas</p>
          <p className="text-sm text-gray-400">
            Sé el primero en opinar sobre este producto
          </p>
        </div>
      ) : (
        reviews?.map((review: any, index: number) => (
          <div key={index} className="flex flex-col gap-4 items-start">
            <div className="flex items-center gap-x-4">
              <Image
                src={review.userimagetext}
                alt={review.userimagetext}
                width={60}
                height={60}
                className="min-h-[60px] rounded-full object-cover"
              />
              <div className="text-secundary">
                <h3 className="font-semibold">{review.fullname}</h3>
                <div className="flex items-center">
                  <StarRating rating={review.rating} />
                  <span className="ml-2 font-medium">
                    {review.rating} • {formatDateToPeru(review.ratedat)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg">{review.reviewtext}</p>
          </div>
        ))
      )}
    </div>
  );
};

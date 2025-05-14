"use client";

import StarRating from "@/shared/components/stars/Stars";
import React, { useState } from "react";

const RatingFilter = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const toggleRating = (rating: number) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  return (
    <div className="p-4 w-60  rounded shadow-sm">
      <h2 className="text-base font-semibold text-secundary mb-3">Ratings</h2>
      <div className="flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label
            key={rating}
            className="flex items-center cursor-pointer space-x-2"
          >
            <input
              type="checkbox"
              checked={selectedRating === rating}
              onChange={() => toggleRating(rating)}
              className="form-checkbox h-4 w-4 text-sm border-gray-400 accent-red-500 text-white"
            />
            <div className="flex">
              <StarRating rating={rating} className="gap-x-3" />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;

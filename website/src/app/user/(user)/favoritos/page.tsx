import { BagIcon } from "@/components/icons";
import React from "react";

const page = () => {
  return (
    <div className="text-secundary">
      <div className="flex items-center justify-start font-semibold gap-x-4 mb-6 ">
        <div className="bg-[#F3F5F9] px-2 py-1 rounded-xl">
          <BagIcon />
        </div>
        <p className="text-2xl font-medium">Favoritos</p>
      </div>
    </div>
  );
};

export default page;

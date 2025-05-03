import React from "react";

export const Loanding = () => {
  return (
    <div className="flex flex-1 justify-center items-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50" />
      <span className="ml-4 text-lg text-primary font-medium">
        Cargando producto...
      </span>
    </div>
  );
};

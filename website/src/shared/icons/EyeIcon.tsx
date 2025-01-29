import React from "react";

export const EyeIcon = () => {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
    >
      {/* Forma del ojo */}
      <path
        d="M16 1C9 1 3.5 5 1 10c2.5 5 8 9 15 9s12.5-4 15-9c-2.5-5-8-9-15-9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Círculo blanco (iris) */}
      <circle cx="16" cy="10" r="6" fill="white" />

      {/* Pupila */}
      <circle cx="16" cy="10" r="3" fill="currentColor" />
    </svg>
  );
};

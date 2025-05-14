"use client";

import React, { useState } from "react";

const colors = [
  { name: "Black", hex: "#1F1F1F" },
  { name: "Red", hex: "#FF6B6B" },
  { name: "Yellow", hex: "#FFC75F" },
  { name: "Green", hex: "#63F5B0" },
  { name: "Cyan", hex: "#64F7FF" },
  { name: "Blue", hex: "#6C63FF" },
  // Puedes agregar más colores aquí
];

const ColorFilter = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-secundary mb-4">Colors</h2>
      <div className="flex justify-center flex-wrap gap-4">
        {colors.map((color) => (
          <button
            key={color.hex}
            title={color.name}
            onClick={() => handleSelect(color.hex)}
            className={`w-8 h-8 rounded-full border-2 transition duration-200 focus:outline-none ${
              selectedColor === color.hex
                ? "ring-2 ring-offset-2 ring-gray-600"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;

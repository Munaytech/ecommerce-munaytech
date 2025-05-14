"use client";

import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRange = () => {
  const [range, setRange] = useState<[number, number]>([0, 300]);

  const handleChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setRange([value[0], value[1]]);
    }
  };

  return (
    <div className="w-full p-4  rounded">
      <h2 className="text-base font-semibold text-secundary mb-3">Price Range</h2>

      <Slider
        range={true}
        min={0}
        max={1000}
        value={range}
        onChange={handleChange}
        onChangeComplete={handleChange}
        trackStyle={[{ backgroundColor: "#D23F57" }]}
        railStyle={{ backgroundColor: "lightblue" }}
        handleStyle={[
          { backgroundColor: "#D23F57", borderColor: "#D23F57" },
          { backgroundColor: "#D23F57", borderColor: "#D23F57" },
        ]}
      />

      <div className="flex items-center justify-center gap-2 mt-4">
        <input
          type="number"
          className="w-28 px-2 py-1 border border-gray-300 hover:border-secundary text-secundary rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={range[0]}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) {
              const newMin = Math.min(val, range[1]);
              if (newMin !== range[0]) {
                setRange([newMin, range[1]]);
              }
            }
          }}
        />
        <span>-</span>
        <input
          type="number"
          className="w-28 px-2 py-1 border border-gray-400 hover:border-secundary text-secundary rounded focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={range[1]}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) {
              const newMax = Math.max(val, range[0]);
              if (newMax !== range[1]) {
                setRange([range[0], newMax]);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default PriceRange;

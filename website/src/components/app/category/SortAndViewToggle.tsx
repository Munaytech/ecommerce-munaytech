"use client";

import React, { useState } from "react";
import { FaTh, FaBars } from "react-icons/fa";
import FilterDrawer from "./FilterDrawer";
import { FiToggleRight } from "react-icons/fi";
import { BiFilter } from "react-icons/bi";

interface SortAndViewToggleProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  filters: FiltersAllProps; // Replace 'any' with the appropriate type for filters
  setFilters: (filters: FiltersAllProps) => void;
}

const SortAndViewToggle: React.FC<SortAndViewToggleProps> = ({
  view,
  setView,
  filters,
  setFilters,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState("Relevance");
  // const [view, setView] = useState<"grid" | "list">("list");

  const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low"];

  const handleSortChange = (sort: (typeof sortOptions)[number]) => {
    setSort(sort);
  };

  return (
    <div className="flex w-full  md:w-auto  items-center justify-between md:justify-end gap-x-4 gap-y-1 p-4 text-sm text-gray-600">
      {/* Sort */}
      <div className="flex items-center w-full md:w-auto gap-2">
        <span className="text-gray-500 hidden md:block">Sort by:</span>
        <div className="relative w-full md:w-auto">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none border border-gray-300 text-gray-700 rounded-md px-4 py-2 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm"
          >
            {sortOptions.map((option) => (
              <option key={option} className="text-gray-700 ">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end w-full md:w-auto gap-2">
        <span className="text-gray-500 hidden md:block ">View:</span>
        <button
          onClick={() => setView("grid")}
          className={`p-1 rounded ${
            view === "grid" ? "text-primary" : "text-gray-400"
          }`}
        >
          <FaTh size={18} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-1 rounded ${
            view === "list" ? "text-primary" : "text-gray-400"
          }`}
        >
          <FaBars size={18} />
        </button>
        <div className="relative block md:hidden">
          <div className="flex justify-end">
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-primary text-white rounded"
            >
              <BiFilter size={20} className="" />
            </button>
          </div>
          <FilterDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default SortAndViewToggle;

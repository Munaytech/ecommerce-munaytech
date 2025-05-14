"use client";

import React from "react";
import { FiltersAll } from "./FiltersAll";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersAllProps; // Replace 'any' with the appropriate type for filters
  setFilters: (filters: FiltersAllProps) => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <FiltersAll filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;

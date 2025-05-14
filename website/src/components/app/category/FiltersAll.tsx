import React from "react";
import PriceRange from "./PriceRange";
import ColorFilter from "./ColorFilter";
import RatingFilter from "./RatingFilter";

interface FiltersProps {
  filters: FiltersAllProps; // Replace 'any' with the appropriate type for filters
  setFilters: (filters: FiltersAllProps) => void; // Replace 'any' with the appropriate type for filters
}

export const FiltersAll: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div>
      <PriceRange   />
      <RatingFilter />
      <ColorFilter />
    </div>
  );
};

"use client";
import FilterDrawer from "@/components/app/category/FilterDrawer";
import { FiltersAll } from "@/components/app/category/FiltersAll";
import SortAndViewToggle from "@/components/app/category/SortAndViewToggle";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductList } from "@/components/shared/ProductList";
import { productosList } from "@/data/products";
import React, { useState } from "react";

const Page = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState<FiltersAllProps>({
    priceRange: [0, 100],
    rating: 0,
    colors: [],
  });

  const productos = productosList;
  return (
    <div className="">
      <div className="flex max-w-[1500px] mx-auto text-primary ">
        <div className="w-full max-w-[1600px] mx-auto flex ">
          <div className="w-72 p-4 hidden  md:block ">
            <FiltersAll filters={filters} setFilters={setFilters} />
          </div>
          <div className="flex-1 w-full p-4">
            <SortAndViewToggle
              view={view}
              setView={setView}
              filters={filters}
              setFilters={setFilters}
            />
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 ">
              {productos.map((product, index) => {
                return view === "list" ? (
                  <div key={index} className="col-span-3">
                    <ProductList key={index} product={product} />
                  </div>
                ) : (
                  <div key={index} className="col-span-3 md:col-span-1">
                    <ProductGrid key={index} product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

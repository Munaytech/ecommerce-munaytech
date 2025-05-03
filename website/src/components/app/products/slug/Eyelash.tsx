"use client";

import { TabOne } from "@/shared/components/tabs/TabOne";
// import { Tabs } from "@/components/Tabs"; // Importa el componente global
import { Description } from "./Description";
import { Reviews } from "./Reviews";

interface EyelashType {
  description?: string; // Replace 'any' with the actual type of 'description' if known
  reviews?: any | null; // Replace 'any' with the actual type of 'reviews' if known
}

export const Eyelash = ({ description = "", reviews = null }: EyelashType) => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
  ];
  return (
    <TabOne tabs={tabs}>
      <Description description={description} />
      <Reviews reviews={reviews} />
    </TabOne>
  );
};

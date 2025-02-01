"use client";

import { TabOne } from "@/shared/components/tabs/TabOne";
// import { Tabs } from "@/components/Tabs"; // Importa el componente global
import { Description } from "./Description";
import { Reviews } from "./Reviews";

export const Eyelash = () => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <TabOne tabs={tabs}>
      <Description />
      <Reviews />
    </TabOne>
  );
};

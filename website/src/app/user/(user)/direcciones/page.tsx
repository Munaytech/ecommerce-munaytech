"use client";
import UserDrawer from "@/components/app/user/UserDrawer";
import { BagIcon, FlechaIcon, MenuIcon, ProfileIcon } from "@/components/icons";
import { getColorBackground, getColorText } from "@/shared/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const data = [
  {
    ordernum: "#f0ba538b-c8f3-45ce",
    orderdate: "Nov 10, 2022",
    orderprice: "$350.00",
    orderidstate: 1,
    orderstate: "Pending",
  },
  {
    ordernum: "#1f10985b-09a8-4d93",
    orderdate: "Nov 10, 2022",
    orderprice: "$500.00",
    orderidstate: 2,
    orderstate: "Processing",
  },
  {
    ordernum: "#6d54d506-208a-43bb",
    orderdate: "Dec 22, 2020",
    orderprice: "$700.00",
    orderidstate: 3,
    orderstate: "Delivered",
  },
  {
    ordernum: "#753deee0-56b3-40a7",
    orderdate: "Dec 14, 2020",
    orderprice: "$300.00",
    orderidstate: 0,
    orderstate: "Cancelled",
  },
];

const Page = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="text-secundary">
      <div className="flex items-center justify-between font-semibold gap-x-4 mb-6 ">
        <div className="flex items-center justify-start gap-x-4">
          <div className="bg-[#F3F5F9] px-2 py-1 rounded-xl">
            <ProfileIcon />
          </div>
          <p className="text-2xl font-medium">Mis Direcciones</p>
        </div>
        <div className="relative block md:hidden">
          <button onClick={() => setDrawerOpen(true)} className="">
            <MenuIcon />
          </button>
          <UserDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </div>
      </div>
      <div className="text-secundary">
        {data.map((order, index) => (
          <div key={index} className="">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-y-4 text-secondary  borderone py-2 px-6 mb-4">
              <div className="col-span-1 md:col-span-2  text-left  mx-3 flex flex-col items-start justify-center">
                <p className="text-[#7D879C]  text-sm ">Nombre</p>
                <p className="text-secundary text-sm ">Nick</p>
              </div>
              <div className="ol-span-1 md:col-span-4   text-left  mx-3 flex flex-col items-start justify-center">
                <p className="text-[#7D879C]  text-sm">Direccion</p>
                <p className="text-secundary text-sm ">
                  497 Erdman Passage, New Zoietown
                </p>
              </div>
              <div className="ol-span-1 md:col-span-2   text-left mx-3 flex flex-col items-start justify-center">
                <p className="text-[#7D879C]  text-sm">Referencia</p>
                <p className="text-secundary text-sm ">
                  Jayden.Gislason78@gmail.com
                </p>
              </div>
              <div className="col-span-1 flex  items-center justify-end">
                <Link href={"/user/soporte/1"}>
                  <button className="rounded-2xl px-2 py-2 hover:bg-gray-100">
                    <FlechaIcon />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

import { BagIcon, ProfileIcon } from "@/components/icons";
import { getColorBackground, getColorText } from "@/shared/utils";
import Image from "next/image";
import React from "react";

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
  return (
    <div className="text-secundary">
      <div className="flex items-center justify-start font-semibold gap-x-4 mb-6 ">
        <div className="bg-[#F3F5F9] px-2 py-1 rounded-xl">
          <ProfileIcon />
        </div>
        <p className="text-2xl font-medium">Mi Perfil</p>
      </div>
      <div className="text-secundary">
        <div className="">
          <div className="grid grid-cols-9 text-secondary mb-4">
            <div className="col-span-5 borderone flex items-center justify-between  mr-3 px-6">
              <div className="flex items-center justify-center gap-x-4">
                <div>
                  <Image
                    src="/images/profile.png"
                    alt="profile"
                    width={280}
                    height={100}
                    style={{ width: "auto", height: "auto" }}
                    // className="mt-20 z-10"
                    priority
                  />
                </div>
                <div>
                  <p>Nick DuBuque</p>
                </div>
              </div>
              <p className="text-[#7D879C] font-publicSans text-sm font-normal leading-[21px] tracking-[3px]">
                SILVER USER
              </p>
            </div>
            <div className="col-span-1  borderone text-center p-6 mx-3">
              <p className="text-primary font-medium text-xl ">16</p>
              <p className="text-quaternary text-sm ">All Orders</p>
            </div>
            <div className="col-span-1  borderone text-center p-6 mx-3">
              <p className="text-primary font-medium text-xl">02</p>
              <p className="text-quaternary text-sm ">Awaiting Payments</p>
            </div>
            <div className="col-span-1  borderone text-center p-6 mx-3">
              <p className="text-primary font-medium text-xl">00</p>
              <p className="text-quaternary text-sm ">Awaiting Shipment</p>
            </div>
            <div className="col-span-1  borderone text-center p-6 mx-3">
              <p className="text-primary font-medium text-xl">01</p>
              <p className="text-quaternary text-sm ">Awaiting Delivery</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-11 text-secondary  borderone py-4 px-6 mb-4">
            <div className="col-span-2   text-left p-6 mx-3">
              <p className="text-[#7D879C]  text-sm ">Nombres</p>
              <p className="text-secundary text-sm ">Nick</p>
            </div>
            <div className="col-span-2   text-left p-6 mx-3">
              <p className="text-[#7D879C]  text-sm">Apellidos</p>
              <p className="text-secundary text-sm ">DuBuque</p>
            </div>
            <div className="col-span-3   text-left p-6 mx-3">
              <p className="text-[#7D879C]  text-sm">Email</p>
              <p className="text-secundary text-sm ">
                Jayden.Gislason78@gmail.com
              </p>
            </div>
            <div className="col-span-2   text-left p-6 mx-3">
              <p className="text-[#7D879C]  text-sm">Telefono</p>
              <p className="text-secundary text-sm ">(445) 653-3771 x985</p>
            </div>
            <div className="col-span-2   text-left p-6 mx-3">
              <p className="text-[#7D879C]  text-sm">Nacimiento</p>
              <p className="text-secundary text-sm ">25 Apr, 1996</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

import { BagIcon } from "@/shared/icons";
import { getColorBackground, getColorText } from "@/shared/utils";
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
    orderidstate: 4,
    orderstate: "Cancelled",
  },
];

const Page = () => {
  return (
    <div className="text-secundary">
      <div className="flex items-center justify-start font-semibold gap-x-4 mb-6 ">
        <div className="bg-[#F3F5F9] px-2 py-1 rounded-xl">
          <BagIcon />
        </div>
        <p className="text-2xl font-medium">Mis Ordenes</p>
      </div>
      <div >
        {data.map((order, index) => (
          <div key={index} className="">
            <div className="grid grid-cols-4 text-secondary borderone py-4 px-6 mb-4">
              <div className="col-span-1 text-base text-left">
                <p>{order.ordernum}</p>
              </div>
              <div className="col-span-1 text-center">
                <span
                  className="rounded-2xl px-4 py-1"
                  style={{
                    backgroundColor: getColorBackground(order.orderidstate),
                    color: getColorText(order.orderidstate),
                  }}
                >
                  {order.orderstate}
                </span>
              </div>
              <div className="col-span-1 text-center">
                <p>{order.orderdate}</p>
              </div>
              <div className="col-span-1 text-center">
                <p>{order.orderprice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

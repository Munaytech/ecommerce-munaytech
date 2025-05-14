import { BagIcon, FlechaIcon, SoporteIcon } from "@/components/icons";
import { getColorBackground, getColorText } from "@/shared/utils";
import Link from "next/link";
import React from "react";

const data = [
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Urgente",
    ticketidpriority: 4,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Urgente",
    ticketidpriority: 4,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Normal",
    ticketidpriority: 2,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Urgente",
    ticketidpriority: 4,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Urgente",
    ticketidpriority: 4,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
  {
    tickettext: "Product Broken. I need refund",
    ticketstate: "Abierto",
    ticketidstate: 3,
    ticketpriority: "Urgente",
    ticketidpriority: 4,
    ticketdate: "Apr 13, 2022",
    tickettipo: "Website Problem",
  },
];

const Page = () => {
  return (
    <div className="text-secundary">
      <div className="flex items-center justify-start font-semibold gap-x-4 mb-6 ">
        <div className="bg-[#F3F5F9] px-2 py-1 rounded-xl">
          <SoporteIcon />
        </div>
        <p className="text-2xl font-medium">Soporte</p>
      </div>
      <div>
        {data.map((ticket, index) => (
          <div key={index} className="">
            <div className="grid grid-cols-1 text-secondary borderone py-4 px-6 mb-4">
              <div className="col-span-1 text-xs text-left flex items-center justify-between ">
                <div>
                  <p className="text-sm mb-2 ">{ticket.tickettext}</p>
                  <div className="flex items-center justify-start gap-x-4">
                    <p
                      className="rounded-xl px-4 py-1 "
                      style={{
                        backgroundColor: getColorBackground(
                          ticket.ticketidpriority
                        ),
                        color: getColorText(ticket.ticketidpriority),
                      }}
                    >
                      {ticket.ticketpriority}
                    </p>
                    <p
                      className="rounded-xl px-4 py-1 "
                      style={{
                        backgroundColor: getColorBackground(
                          ticket.ticketidstate
                        ),
                        color: getColorText(ticket.ticketidstate),
                      }}
                    >
                      {ticket.ticketstate}
                    </p>
                    <p className="text-[#7D879C]">{ticket.ticketdate}</p>
                    <p className="text-[#7D879C]">{ticket.tickettipo}</p>
                  </div>
                </div>
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

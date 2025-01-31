import { Arrivals } from "@/components/app/Arrivals";
import { Categoria } from "@/components/app/Categoria";
import { Descuentos } from "@/components/app/Descuentos";
import { Marcas } from "@/components/app/Marcas";
import { Oferta } from "@/components/app/Oferta";
import { Rating } from "@/components/app/Rating";
import { Relampago } from "@/components/app/Relampago";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-10">
      <Oferta />
      <Relampago />
      <Categoria />
      <Rating />
      <Arrivals />
      <Descuentos />
      <Marcas />
    </div>
  );
}

import { Oferta } from "@/components/app/Oferta";
import { Relampago } from "@/components/app/Relampago";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-10">
      <Oferta />
      <Relampago />
    </div>
  );
}

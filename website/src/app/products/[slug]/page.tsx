"use client";

import React, { use, useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Information } from "@/components/app/products/slug/Information";
import { EyeIcon } from "@/shared/icons";
import { Eyelash } from "@/components/app/products/slug/Eyelash";
import RequestPg from "@/server/axios/RequestPg";
import Link from "next/link";
import { NotFound } from "@/components/NotFound";
import { Loanding } from "@/components/Loanding";
interface ResponseType {
  product: any; // Replace 'any' with the actual type of 'product' if known
  variant: any; // Replace 'any' with the actual type of 'variant' if known
  urlparams: string;
  description: string; // Replace 'any' with the actual type of 'description' if known
  rating: any; // Replace 'any' with the actual type of 'rating' if known
}

const ProductPage = () => {
  type Status = "loading" | "success" | "not_found";
  const [status, setStatus] = useState<Status>("loading");

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const requestParams = (searchParams: URLSearchParams) => {
    return {
      slug: params.slug,
      variant: Array.from(searchParams.entries()).map(([name, value]) => ({
        name,
        value,
      })),
      selected: Object.fromEntries(searchParams.entries()) as Record<
        string,
        string
      >,
    };
  };

  const [response, setResponse] = useState<ResponseType | null>(null);
  useEffect(() => {
    setStatus("loading");
    const fetchData = async () => {
      const response = await RequestPg(
        "/product/productid",
        "POST",
        requestParams(searchParams)
      );
      if (response?.success === true) {
        const params = new URLSearchParams(response?.data?.urlparams);
        router.replace(`?${params.toString()}`, { scroll: false });
        setResponse(response?.data);
        setSelectedVariants(requestParams(params).selected);
        setStatus("success");
      } else {
        setStatus("not_found");
      }
    };
    fetchData();
  }, []);

  const handleVariantChange = async (name: string, value: string) => {
    const updated = { ...selectedVariants, [name]: value };
    const params = new URLSearchParams(updated);
    // setStatus("loading");
    const response = await RequestPg(
      "/product/productid",
      "POST",
      requestParams(params)
    );
    if (response?.success === true) {
      const params = new URLSearchParams(response?.data?.urlparams);
      router.replace(`?${params.toString()}`, { scroll: false });
      setResponse(response?.data);
      setSelectedVariants(requestParams(params).selected);
      // setStatus("success");
    } else {
      // setStatus("not_found");
    }
  };

  if (status === "loading") return <Loanding />;

  if (status === "not_found") return <NotFound />;

  return (
    <div>
      <Information
        product={response?.product}
        options={response?.variant.sort(
          (a: any, b: any) => a.idvarianttype - b.idvarianttype
        )}
        selectedVariants={selectedVariants}
        onVariantChange={handleVariantChange}
      />
      <Eyelash description={response?.description} reviews={response?.rating} />
    </div>
  );
};

export default ProductPage;

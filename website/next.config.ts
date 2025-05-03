import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // acepta cualquier dominio
      },
      {
        protocol: "http",
        hostname: "**", // también si usas http (opcional)
      },
    ],
  },
};

export default nextConfig;

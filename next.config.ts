import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⬅️ active le mode statique
  images: {
    unoptimized: true, // ⬅️ obligatoire avec next export
  },
};

export default nextConfig;

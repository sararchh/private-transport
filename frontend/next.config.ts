import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
  }
};

export default nextConfig;

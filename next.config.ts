import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    domains: ["res.cloudinary.com"],
  },

  turbopack: {},
};

module.exports = withPWA(nextConfig);

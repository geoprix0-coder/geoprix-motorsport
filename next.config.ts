import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repositoryName = "geoprix-motorsport";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repositoryName}` : "",
};

export default nextConfig;

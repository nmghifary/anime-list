import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:"cdn.myanimelist.net"
      }
    ]
  }
};

export default nextConfig;

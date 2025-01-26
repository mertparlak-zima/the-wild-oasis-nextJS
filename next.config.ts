const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pxiukdgijvhvlvhmcpgr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

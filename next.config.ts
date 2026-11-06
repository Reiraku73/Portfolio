import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // app/global-not-found.tsx: the 404 for URLs that match no route. The root
    // layout is app/[lang]/layout.tsx, so there is no single layout for it.
    globalNotFound: true,
  },
};

export default nextConfig;

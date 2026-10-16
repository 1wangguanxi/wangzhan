import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['@zhiyu/content'],
  devIndicators: false,
  async headers() {
    return [{source:'/images/:path*',headers:[{key:'Cache-Control',value:'public, max-age=86400, stale-while-revalidate=604800'}]}];
  },
};
export default config;

import type { NextConfig } from 'next';
const config:NextConfig={poweredByHeader:false,devIndicators:false,transpilePackages:['@zhiyu/admin-contracts'],async headers(){return [{source:'/:path*',headers:[{key:'X-Frame-Options',value:'DENY'},{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'same-origin'},{key:'Cache-Control',value:'no-store'}]}]}};
export default config;

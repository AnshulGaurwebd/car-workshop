/** @type {import('next').NextConfig} */
const nextConfig = {
 poweredByHeader: false,
 productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; " +
                   "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com; " + // Allow GSAP
                   "style-src 'self' 'unsafe-inline'; " +
                   "img-src 'self' data: blob:; " + // Allow local images
                   "font-src 'self'; " +
                   "object-src 'none'; " +
                   "frame-ancestors 'none';", // Prevents Click-jacking
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
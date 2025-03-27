/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental section
  serverExternalPackages: [
    // Add any external packages that need server-side rendering
    'next-auth'
  ],
  // Optional: Turbopack configuration
  experimental: {
    turbo: {
      resolveAlias: {
        'next-auth': 'next-auth'
      }
    }
  }
};

module.exports = nextConfig;
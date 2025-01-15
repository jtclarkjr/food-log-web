import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL
          ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
          : '',
        pathname: `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_PATH || ''}**`
      }
    ]
  }
}

export default nextConfig

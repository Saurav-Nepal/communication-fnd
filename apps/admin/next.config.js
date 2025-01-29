/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
    // experimental: {
    //     turbo: {
    //         resolveAlias: {
    //             canvas: './empty-module.ts',
    //         },
    //     },
    // },
    reactStrictMode: false,
    env: {
        NEXT_PUBLIC_APP_VERSION: version,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if the project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.com',
            },
        ],
    },
};

module.exports = nextConfig;

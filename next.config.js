/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')()

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'lastfm.freetls.fastly.net',
            },
            {
                hostname: 'strapi.omarzunic.com',
            },
            {
                hostname: 'i.scdn.co',
            },
            {
                hostname: 'media0.giphy.com',
            },
            {
                hostname: 'image.tmdb.org',
            },
        ],
    },
    webpack: (config, { dev, isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

module.exports = removeImports(nextConfig)

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, 
      },
      
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, 
        use: ['@svgr/webpack'],
      },
    )

    
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  async redirects() {
    return [
      { source: '/:locale(en|fr|tr)/work', destination: '/:locale/projects', permanent: false },
      { source: '/:locale(en|fr|tr)/work/:path*', destination: '/:locale/projects', permanent: false },
      { source: '/:locale(en|fr|tr)/blog', destination: '/:locale/blogs', permanent: false },
      { source: '/:locale(en|fr|tr)/blog/:path*', destination: '/:locale/blogs/:path*', permanent: false },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
    
}

export default withNextIntl(nextConfig);

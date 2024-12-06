import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    domains: ['shared.cloudflare.steamstatic.com'],
  },  
    
}

export default withNextIntl(nextConfig);

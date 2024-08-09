/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = import.meta.dirname;

const nextConfig = {
  // output: 'export',
  images: {
      unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    WORDPRESS_MENU_LOCATION_NAVIGATION: process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || 'PRIMARY',
    WORDPRESS_PLUGIN_SEO: process.env.WORDPRESS_PLUGIN_SEO ? process.env.WORDPRESS_PLUGIN_SEO : 'false',
  }
};

export default nextConfig;

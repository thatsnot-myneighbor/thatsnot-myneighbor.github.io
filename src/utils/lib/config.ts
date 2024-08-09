import {IAppConfig} from "@/utils/interfaces/commons";

console.log(process.env.WORDPRESS_PLUGIN_SEO);
const wpEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT ? process.env.WORDPRESS_GRAPHQL_ENDPOINT : 'http://localhost:8080';
const seoEnabled = Boolean(process.env.WORDPRESS_PLUGIN_SEO) || false;

const appConfig: IAppConfig = {
  endpoint: wpEndpoint,
  seo: seoEnabled
}

export default appConfig;
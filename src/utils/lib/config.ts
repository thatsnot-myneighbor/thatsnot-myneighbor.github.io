import {IAppConfig} from "@/utils/interfaces/commons";

const wpEndpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT ? process.env.WORDPRESS_GRAPHQL_ENDPOINT : 'http://localhost:8080';
const postsPerPage = process.env.POSTS_PER_PAGE ? Number(process.env.POSTS_PER_PAGE) : false;
const seoEnabled = Boolean(process.env.WORDPRESS_PLUGIN_SEO) || false;

const appConfig: IAppConfig = {
  endpoint: wpEndpoint,
  seo: seoEnabled,
  postsPerPage: postsPerPage,
}

export default appConfig;
import appConfig from '@/utils/lib/config';
import { getApolloClient } from '@/utils/lib/apollo-client';

import { QUERY_ALL_CATEGORIES, QUERY_CATEGORY_BY_SLUG, QUERY_CATEGORY_SEO_BY_SLUG } from '@/utils/data/categories';
import {ICategory} from "@/utils/interfaces/categories";
import {ICategoryCard} from "@/utils/interfaces/categories";
import {IQueryData} from "@/utils/interfaces/commons";

/**
 * categoryPathBySlug
 */

export function categoryPathBySlug(slug: string) {
  return `/c/${slug}`;
}

/**
 * getAllCategories
 */

export async function getAllCategories() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_CATEGORIES,
  });

  const categories = data?.data.categories.edges.map(({ node = {} }) => node);

  return Array.isArray(categories) && categories.map(mapCategoryCardData);
}

/**
 * Get category data by slug
 */
export async function getCategoryBySlug(slug: string) {
  const apolloClient = getApolloClient();
  const apiHost = new URL(appConfig.endpoint).host;

  let categoryData;
  let seoData;

  try {
    categoryData = await apolloClient.query({
      query: QUERY_CATEGORY_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`[categories][getCategoryBySlug] Failed to query category data: ${e.message}`);
    throw e;
  }

  if (!categoryData?.data.category) return { category: undefined };

  const category = mapCategoryData(categoryData?.data.category);

  category.content = category.description

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_CATEGORY_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (e) {
      console.log(`[categories][getCategoryBySlug] Failed to query SEO plugin: ${e.message}`);
      console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      throw e;
    }

    const { seo = {} } = seoData?.data?.category || {};

    category.title = seo.title;
    category.description = seo.metaDesc;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      category.canonical = seo.canonical;
    }

    category.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    category.article = {
      author: category.og.author,
      modifiedTime: category.og.modifiedTime,
      publishedTime: category.og.publishedTime,
      publisher: category.og.publisher,
    };

    category.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    category.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    category,
  };
}

/**
 * getCategories
 */

export async function getCategories({ count } = {}) {
  const { categories } = await getAllCategories();
  return {
    categories: categories.slice(0, count),
  };
}

/**
 * Map category query to category data
 */

export function mapCategoryData(categoryData: IQueryData = {}): ICategory {
  const {
    databaseId,
    slug,
    name,
    description,
  } = categoryData;

  return {
    id: databaseId,
    slug: slug,
    title: name,
    content: description,
  };
}

/**
 * Map category query to category card
 */

export function mapCategoryCardData(categoryData: IQueryData = {}): ICategoryCard {
  const {
    databaseId,
    slug,
    name,
  } = categoryData;

  return {
    id: databaseId,
    slug: slug,
    title: name,
  };
}

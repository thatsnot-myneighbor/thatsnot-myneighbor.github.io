import {getClient} from '@/utils/lib/apollo-client';
import {sortObjectsByDate} from '@/utils/helpers/datetime';

import {
  QUERY_ALL_POSTS,
  QUERY_TOP_POSTS,
  QUERY_SIDE_POSTS,
  QUERY_POST_BY_SLUG,
  QUERY_POSTS_BY_CATEGORY_ID_INDEX,
  QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE,
  QUERY_POSTS_BY_CATEGORY_ID,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_POST_PER_PAGE,
} from '@/utils/data/posts';
import {IPost, IPostCard} from "@/utils/interfaces/posts";
import {unstable_noStore} from "next/cache";
import {IQueryData} from "@/utils/interfaces/commons";
import appConfig from "@/utils/lib/config";
import {ICategoryCard} from "@/utils/interfaces/categories";
import {mapCategoryData} from "@/utils/lib/categories";

/**
 * postPathBySlug
 */

export function postPathBySlug(slug: string) {
  return `/games/${slug}`;
}

/**
 * getPostBySlug
 */

export async function getPostBySlug(slug: string) {
  const apolloClient = getClient();
  const apiHost = new URL(appConfig.endpoint).host;

  let postData;
  let seoData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`[posts][getPostBySlug] Failed to query post data: ${err.message}`);
    }
    throw err;
  }

  if (!postData?.data.post) return {post: undefined};

  const post = [postData?.data.post].map(mapPostData)[0];

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (appConfig.seo) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_POST_SEO_BY_SLUG,
        variables: {
          slug,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`[posts][getPostBySlug] Failed to query SEO plugin: ${err.message}`);
        console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
      }
      throw err;
    }

    const {seo = {}} = seoData?.data?.post || {};

    post.metaTitle = seo.title;
    post.metaDescription = seo.metaDesc;

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      post.canonical = seo.canonical;
    }

    post.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    };

    post.article = {
      author: post.og.author,
      modifiedTime: post.og.modifiedTime,
      publishedTime: post.og.publishedTime,
      publisher: post.og.publisher,
    };

    post.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    };

    post.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    };
  }

  return {
    post,
  };
}

export async function getAllPosts(options = {}) {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_ALL_POSTS,
    fetchPolicy: 'no-cache'
  });

  const posts = data?.data.posts.edges.map(({node = {}}) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostCardData),
  };
}


/**
 * Get top posts
 */

export async function getTopPosts() {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_TOP_POSTS,
  });

  const posts = data?.data.posts.edges.map(({node = {}}) => node);

  return {
    topPosts: Array.isArray(posts) && posts.map(mapPostCardData),
  };
}

/**
 * Get side posts
 * Refactored
 */

export async function getSidePosts() {
  const apolloClient = getClient();

  const data = await apolloClient.query({
    query: QUERY_SIDE_POSTS,
  });

  const posts = data?.data.posts.edges.map(({node = {}}) => node);

  return {
    sidePosts: Array.isArray(posts) && posts.map(mapPostCardData),
  };
}

/**
 * getPostsByCategoryId
 */

export async function getPostsByCategoryId(categoryId: string) {
  const apolloClient = getClient();

  let postData;

  try {
    postData = await apolloClient.query({
      query: QUERY_POSTS_BY_CATEGORY_ID,
      variables: {
        categoryId,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[posts][getPostsByCategoryId] Failed to query post data: ${err.message}`);
    }
    throw err;
  }

  const posts = postData?.data.posts.edges.map(({node = {}}) => node);

  return {
    posts: Array.isArray(posts) && posts.map(mapPostCardData),
  };
}

/**
 * getPaginatedPostsByCategoryId
 */

export async function getPaginatedPostsByCategoryId(categoryId: string, currentPage: number = 1) {
  const {posts} = await getPostsByCategoryId(categoryId);
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);
  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}


/**
 * getRecentPosts
 */

export async function getRecentPosts({count, ...options}) {
  const {posts} = await getAllPosts(options);
  const sorted = sortObjectsByDate(posts);
  return {
    posts: sorted.slice(0, count),
  };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
  if (typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitized;
}

/**
 * Build Post card data
 */
export function mapPostCardData(postData: IQueryData = {}): IPostCard {
  const {
    databaseId,
    slug,
    title,
    categories,
    featuredImage,
    isSticky,
    likes
  } = postData;

  const post = {
    postId: databaseId,
    slug: slug,
    title: title,
    categories: [],
    featuredImage: {},
    isSticky: isSticky,
    likes: {
      up: likes.up,
      down: likes.down,
    }
  }

  // Clean up the categories to make them more easy to access
  if (postData.categories) {
    post.categories = categories.edges.map(({node}) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (postData.featuredImage) {
    post.featuredImage = featuredImage.node;
  }

  return post;
}

/**
 * Build single post data
 */

export function mapPostData(postData: IQueryData = {}): IPost {
  const {
    databaseId,
    slug,
    title,
    metaTitle,
    description,
    content,
    categories,
    csOptionsPost,
    featuredImage,
    isSticky,
    likes
  } = postData;

  const post = {
    postId: databaseId,
    slug: slug,
    title: title,
    metaTitle: metaTitle,
    description: description,
    content: content,
    categories: [],
    csOptionsPost: csOptionsPost,
    featuredImage: {},
    isSticky: isSticky,
    likes: {
      up: likes.up,
      down: likes.down,
    }
  }

  // Clean up the categories to make them more easy to access
  if (postData.categories) {
    post.categories = categories.edges.map(({node}) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access

  if (postData.featuredImage) {
    post.featuredImage = featuredImage.node;
  }

  return post;
}

/**
 * getRelatedPosts
 */

export async function getRelatedPosts(
  categories: ICategoryCard[],
  postId: string,
  count = 5
) {
  if (!Array.isArray(categories) || categories.length === 0) return;

  let related: {category: ICategoryCard, posts: IPostCard[]} = {
    category: mapCategoryData(categories && categories.shift()),
    posts: []
  };

  if (related.category) {
    const {posts} = await getPostsByCategoryId(
      related.category.id,
    );

    if (!posts) {
      return false;
    }

    const filtered = posts.filter(({postId: id}: {postId: string}) => id !== postId);
    const sorted = sortObjectsByDate(filtered);
    // related.posts = sorted.map((post) => ({ title: post.title, slug: post.slug }));

    if (Array.isArray(sorted) && sorted.length > count) {
      related.posts = sorted.slice(0, count);
    }
  }

  if (!Array.isArray(related.posts) || related.posts.length === 0) {
    const relatedPosts = await getRelatedPosts(categories, postId, count);
    related = relatedPosts || related;
  }

  if (Array.isArray(related.posts) && related.posts.length > count) {
    related.posts = related.posts.slice(0, count);
    return related;
  }

  return related;
}

/**
 * sortStickyPosts
 */

export function sortStickyPosts(posts: IPostCard[]) {
  return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

/**
 * getPostsPerPage
 */

export async function getPostsPerPage() {
  //If POST_PER_PAGE is defined at next.config.js
  if (appConfig.postsPerPage) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").'
    );
    appConfig.postsPerPage;
  }

  try {
    const apolloClient = getClient();

    const {data} = await apolloClient.query({
      query: QUERY_POST_PER_PAGE,
    });

    return Number(data.allSettings.readingSettingsPostsPerPage);
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Failed to query post per page data: ${err.message}`);
    }
    throw err;
  }
}

/**
 * getPageCount
 */

export async function getPagesCount(
  posts: IPostCard[],
  postsPerPage: number
) {
  const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
  return Math.ceil(posts.length / _postsPerPage);
}

/**
 * getPaginatedPosts
 */
export async function getPaginatedPosts(currentPage: number = 1) {
  const {posts} = await getAllPosts();
  const postsPerPage = await getPostsPerPage();
  const pagesCount = await getPagesCount(posts, postsPerPage);

  let page = Number(currentPage);

  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  } else if (page > pagesCount) {
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        pagesCount,
      },
    };
  }

  const offset = postsPerPage * (page - 1);
  const sortedPosts = sortStickyPosts(posts);
  return {
    posts: sortedPosts.slice(offset, offset + postsPerPage),
    pagination: {
      currentPage: page,
      pagesCount,
    },
  };
}

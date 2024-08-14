import { getClient } from '@/utils/lib/apollo-client';

import {
    QUERY_ALL_PAGES_INDEX,
    QUERY_ALL_PAGES_ARCHIVE,
    QUERY_ALL_PAGES,
    QUERY_PAGE_BY_URI,
    QUERY_PAGE_SEO_BY_URI,
} from '@/utils/data/pages';
import {IPage} from "@/utils/interfaces/pages";
import {IQueryData} from "@/utils/interfaces/commons";
import appConfig from "@/utils/lib/config";

/**
 * pagePathBySlug
 */

export function pagePathBySlug(slug: string) {
    return `/${slug}`;
}

/**
 * getPageByUri
 */

export async function getPageByUri(uri: string): Promise<IPage | false> {
    if (!process.env.WORDPRESS_GRAPHQL_ENDPOINT) {
        return false;
    }

    const apolloClient = getClient();
    const apiHost: string = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host;

    let pageData;
    let seoData;

    try {
        pageData = await apolloClient.query({
            query: QUERY_PAGE_BY_URI,
            variables: {
                uri,
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`[pages][getPageByUri] Failed to query page data: ${err.message}`);
        }
        throw err;
    }

    if (!pageData?.data.page) {
        return false
    };

    const page = [pageData?.data.page].map(mapPageData)[0];

    // If the SEO plugin is enabled, look up the data
    // and apply it to the default settings

    if (appConfig.seo === true) {
        try {
            seoData = await apolloClient.query({
                query: QUERY_PAGE_SEO_BY_URI,
                variables: {
                    uri,
                },
            });
        } catch (e) {
            console.log(`[pages][getPageByUri] Failed to query SEO plugin: ${e.message}`);
            console.log('Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.');
            throw e;
        }

        const { seo = {} } = seoData?.data?.page || {};

        page.metaTitle = seo.title;
        page.description = seo.metaDesc;
        page.readingTime = seo.readingTime;

        // The SEO plugin by default includes a canonical link, but we don't want to use that
        // because it includes the WordPress host, not the site host. We manage the canonical
        // link along with the other metadata, but explicitly check if there's a custom one
        // in here by looking for the API's host in the provided canonical link

        if (seo.canonical && !seo.canonical.includes(apiHost)) {
            page.canonical = seo.canonical;
        }

        page.og = {
            author: seo.opengraphAuthor,
            description: seo.opengraphDescription,
            image: seo.opengraphImage,
            modifiedTime: seo.opengraphModifiedTime,
            publishedTime: seo.opengraphPublishedTime,
            publisher: seo.opengraphPublisher,
            title: seo.opengraphTitle,
            type: seo.opengraphType,
        };

        page.robots = {
            nofollow: seo.metaRobotsNofollow,
            noindex: seo.metaRobotsNoindex,
        };

        page.twitter = {
            description: seo.twitterDescription,
            image: seo.twitterImage,
            title: seo.twitterTitle,
        };
    }

    return page;
}

/**
 * getAllPages
 */

const allPagesIncludesTypes = {
    all: QUERY_ALL_PAGES,
    archive: QUERY_ALL_PAGES_ARCHIVE,
    index: QUERY_ALL_PAGES_INDEX,
};

export async function getAllPages(options = {}) {
    const { queryIncludes = 'index' } = options;

    const apolloClient = getClient();

    const data = await apolloClient.query({
        query: allPagesIncludesTypes[queryIncludes],
    });

    const pages = data?.data.pages.edges.map(({ node = {} }) => node).map(mapPageData);

    return {
        pages,
    };
}

/**
 * getTopLevelPages
 */

export async function getTopLevelPages(options) {
    const { pages } = await getAllPages(options);

    const navPages = pages.filter(({ parent }) => parent === null);

    // Order pages by menuOrder
    navPages.sort((a, b) => parseFloat(a.menuOrder) - parseFloat(b.menuOrder));

    return navPages;
}

/**
 * Build single post data
 */

export function mapPageData(pageData: IQueryData = {}): IPage {
    const {
        databaseId,
        slug,
        title,
        content,
        parent,
        children,
        featuredImage,
    } = pageData;

    const page: IPage = {
        pageId: databaseId,
        slug: slug,
        title: title,
        content: content,
        children: children,
        parent: parent,
    }

    if (pageData.featuredImage) {
        page.featuredImage = featuredImage.node;
    }

    if (pageData.parent) {
        page.parent = pageData.parent.node;
    }

    if (pageData.children) {
        page.children = pageData.children.edges.map(({ node }) => node);
    }

    return page;
}
/**
 * getBreadcrumbsByUri
 */

export function getBreadcrumbsByUri(uri, pages) {
    const breadcrumbs = [];
    const uriSegments = uri.split('/').filter((segment) => segment !== '');

    // We don't want to show the current page in the breadcrumbs, so pop off
    // the last chunk before we start

    uriSegments.pop();

    // Work through each of the segments, popping off the last chunk and finding the related
    // page to gather the metadata for the breadcrumbs

    do {
        const breadcrumb = pages.find((page) => page.uri === `/${uriSegments.join('/')}/`);

        // If the breadcrumb is the active page, we want to pass udefined for the uri to
        // avoid the breadcrumbs being rendered as a link, given it's the current page

        if (breadcrumb) {
            breadcrumbs.push({
                id: breadcrumb.id,
                title: breadcrumb.title,
                uri: breadcrumb.uri,
            });
        }

        uriSegments.pop();
    } while (uriSegments.length > 0);

    // When working through the segments, we're doing so from the lowest child to the parent
    // which means the parent will be at the end of the array. We need to reverse to show
    // the correct order for breadcrumbs

    breadcrumbs.reverse();

    return breadcrumbs;
}

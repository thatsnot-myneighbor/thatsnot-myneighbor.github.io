import { ICategoryCard } from "./categories";

export interface IFeaturedImage {
    altText: string;
    caption?: string;
    sourceUrl: string;
    srcSet: string;
    sizes: string;
    id: number;
    mediaDetails: {
        filteredSizes?: {
            name: string
            sourceUrl: string
        }[]
    }
}

export interface ICsPostOptions {
    flashFullwidth: number;
    fieldGroupName: string;
    flashBest: number;
    flashFavorites: number;
    flashIframe: string;
    flashLink: string;
    flashSide: number;
    flashType: string;
    shortDescription: string;
}

export interface IPostCard {
    postId: string;
    slug: string;
    title: string;
    categories: ICategoryCard[];
    featuredImage: IFeaturedImage;
    isSticky: boolean;
    likes: {
        up: number;
        down: number;
    }
}

export interface IPost {
    postId: string;
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    description: string;
    content: string;
    categories?: ICategoryCard[];
    csOptionsPost: ICsPostOptions;
    featuredImage? : {};
    isSticky: boolean;
    likes: {
        up: number;
        down: number;
    }
}
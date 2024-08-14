import {IFeaturedImage} from "@/utils/interfaces/posts";

export interface IPage {
    pageId: string;
    slug: string;
    title: string;
    content: string;
    children?: IPage[];
    parent?: IPage;
    featuredImage?: IFeaturedImage;
}

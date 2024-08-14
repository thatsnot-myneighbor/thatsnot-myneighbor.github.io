import styles from './styles/TopGame.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import {IPostCard} from "@/utils/interfaces/posts";

import { postPathBySlug } from '@/utils/lib/posts';

const TopGame = ({ post }: {post: IPostCard}) => {
    const featuredImageUrl = post.featuredImage ? post.featuredImage.sourceUrl : '';

    return (
        <Link
            className={styles.topGame}
            href={postPathBySlug(post.slug)}
        >
            <span className={styles.topGame__thumb}>
                <Image
                    src={featuredImageUrl}
                    width="80"
                    height="80"
                    alt={post.title}
                />
            </span>
            <span className={styles.topGame__title}>{post.title}</span>
        </Link>
    );
};

export default TopGame;

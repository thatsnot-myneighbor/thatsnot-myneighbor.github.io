import styles from './styles/BestGame.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { getSidePostsContext } from '@/utils/hooks/ServerContext';
import { postPathBySlug } from '@/utils/lib/posts';
import { pagePathBySlug } from '@/utils/lib/pages';

const BestGame = ({ post }) => {
    const featuredImageUrl = post.featuredImage ? post.featuredImage.sourceUrl : '';

    return (
        <Link
            className={styles.bestGame}
            href={postPathBySlug(post.slug)}
        >
            <span className={styles.bestGame__thumb}>
                <Image
                    src={featuredImageUrl}
                    width="80"
                    height="80"
                    alt={post.title}
                />
            </span>
            <span className={styles.bestGame__title}>{post.title}</span>
        </Link>
    );
};

export default BestGame;

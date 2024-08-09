import { unstable_noStore as noStore } from 'next/cache';
import Head from 'next/head';
import { useMutation } from '@apollo/client';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ReactStars from 'react-rating-stars-component';

import { MUTATION_CREATE_RATING } from '@/utils/data/create-rating';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/utils/lib/posts';
//import { categoryPathBySlug } from '@/utils/lib/categories';
import { formatDate } from '@/utils/helpers/datetime';

import Header from '@/components/Header';
import Section from '@/components/Section';
import Container from '@/components/Container';
import ContentBox from '@/components/ContentBox';
//import Player from '@/components/Player';
import PostCard from '@/components/PostCard';
//import CommentForm from '@/components/CommentForm';

import styles from './page.module.scss';
import GameHead from "@/components/GameHead";
import Player from "@/components/Player";

export default async function Post({ params }: { params: { slug: string } }) {

    noStore();

    const { post } = await getPostBySlug(params?.slug);
    if (!post) {
        return {
            props: {},
            notFound: true,
        };
    }

    const { category: relatedCategory, posts: relatedPosts } =
    (await getRelatedPosts(post.categories, post.databaseId)) || {};
    const relatedPostsList = relatedPosts || {};
    console.log(relatedPostsList)

    const isServer = typeof window === 'undefined' ? true : false;

    /**
    * Handle the comment form submission.
    */
    async function handleRating(newVote) {
        await createRating({
            variables: {
                vote: newVote,
                postID: post.databaseId,
            }
        });
    }

    return (
        <div className="page">
            <Container>
                <GameHead>
                    <h1
                        dangerouslySetInnerHTML={{
                            __html: post.title,
                        }}
                    />
                </GameHead>

                <Section>
                    <ContentBox>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                                __html: post.csOptionsPost.shortDescription,
                            }}
                        />
                    </ContentBox>
                </Section>

                <Section>
                    <Player
                        options={post.csOptionsPost}
                    >
                    </Player>
                </Section>

                <Section>
                    <ContentBox>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{
                                __html: post.content,
                            }}
                        />
                    </ContentBox>
                </Section>

                <Section>
                    {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (
                      <ul className="games-grid">
                          {relatedPostsList.map((post) => (
                            <li className="games-grid__item" key={post.slug}>
                                <PostCard post={post} />
                            </li>
                          ))}
                      </ul>
                    )}
                </Section>

                <Section>
                    <div className="columns columns--side-right">
                        {/* <CommentForm postID={post.databaseId} /> */}
                        <div className="promo">
                            Promo
                        </div>
                    </div>
                </Section>

            </Container>

        </div>
    );
}

export async function generateStaticParams() {
    // Only render the most recent posts to avoid spending unecessary time
    // querying every single post from WordPress

    // Tip: this can be customized to use data or analytitcs to determine the
    // most popular posts and render those instead

    const { posts } = await getAllPosts({
        queryIncludes: 'index',
    });

    if (!posts) {
        return {};
    }

    const paths = posts
        .filter(({ slug }) => typeof slug === 'string')
        .map(({ slug }) => ({
            slug,
        }));

    return paths;
}

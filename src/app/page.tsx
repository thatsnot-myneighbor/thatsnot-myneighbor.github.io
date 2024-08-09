import Image from "next/image";
import styles from "./page.module.css";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {getPaginatedPosts} from "@/utils/lib/posts";
import Section from "@/components/Section";
import {unstable_noStore} from "next/cache";

export default async function Home() {

  const {posts, pagination} = await getPaginatedPosts();

  return (
    <div className="page">
      <Section
        title="All games"
      >
        <ul className="games-grid">
          {posts.map((post) => {
            return (
              <li className="games-grid__item" key={post.slug}>
                <PostCard post={post}/>
              </li>
            );
          })}
        </ul>
        {pagination && (
          <Pagination
            addCanonical={false}
            currentPage={pagination.currentPage}
            pagesCount={pagination?.pagesCount}
            basePath=''
          />
        )}
      </Section>
    </div>
  );
}

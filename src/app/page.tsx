import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import {getPaginatedPosts, getTopPosts} from "@/utils/lib/posts";
import Section from "@/components/Section";
import {getPageByUri} from "@/utils/lib/pages";
import TopGames from "@/components/TopGames";
import ContentBox from "@/components/ContentBox";
import {unstable_noStore} from "next/cache";

export default async function Home() {

  unstable_noStore();

  const {topPosts} = await getTopPosts();
  const {posts, pagination} = await getPaginatedPosts();
  const page = await getPageByUri('homepage');

  if (!page) {
    return {
      props: {},
      notFound: true,
    };
  }

  return (
    <div className="page">
      {/*{topPosts && topPosts.length > 0 && (<TopGames posts={topPosts} />)}*/}

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

      <Section>
        <ContentBox>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          />
        </ContentBox>
      </Section>
    </div>
  );
}

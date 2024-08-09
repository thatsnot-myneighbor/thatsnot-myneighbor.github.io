import {getAllCategories, getCategoryBySlug} from '@/utils/lib/categories';
import {getPaginatedPostsByCategoryId} from '@/utils/lib/posts';

import TemplateArchive from '@/templates/TemplateArchive';

export default async function Category({ params }: { params: { slug: string } }) {
  const {category} = await getCategoryBySlug(params.slug);

  if (!category) {
    return {};
  }

  const {id, title, content, slug} = category;

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const {posts, pagination} = await getPaginatedPostsByCategoryId(id);

  return <TemplateArchive
    title={title}
    posts={posts}
    pagination={pagination}
    slug={slug}
    content={content}
  />;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  if (!categories) {
    return {};
  }

  const paths = categories.map((category) => {
    const {slug} = category;
    return {
      params: {
        slug,
      },
    };
  });

  return paths;
}

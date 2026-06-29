import { error } from '@sveltejs/kit';
import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import type { PageServerLoad } from './$types';

interface DBBlogPost {
  slug: string;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  content: { en: string; fr: string };
  author: string;
  date: string;
  tags: string[];
  readTime: number;
  gradient: string;
  image?: string;
  published: boolean;
}

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  try {
    const collection = await getCollection<DBBlogPost>(COLLECTIONS.BLOG_POSTS);
    const post = await collection.findOne({ slug, published: true });

    if (!post) {
      throw error(404, 'Post not found');
    }

    const serializedPost = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      tags: post.tags,
      readTime: post.readTime,
      gradient: post.gradient,
      image: post.image || ''
    };

    return {
      post: serializedPost
    };
  } catch (err) {
    // If it's already a SvelteKit error, rethrow it
    if (err && typeof err === 'object' && 'status' in err) {
      throw err;
    }
    console.error(`Error loading blog post ${slug}:`, err);
    throw error(404, 'Post not found');
  }
};

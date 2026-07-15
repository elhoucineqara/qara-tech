import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import type { PageServerLoad } from './$types';

interface DBBlogPost {
  slug: string;
  title: { en: string; fr: string };
  excerpt: { en: string; fr: string };
  author: string;
  date: string;
  tags: string[];
  readTime: number;
  image?: string;
  published: boolean;
}

export const load: PageServerLoad = async () => {
  try {
    const collection = await getCollection<DBBlogPost>(COLLECTIONS.BLOG_POSTS);
    
    // Fetch published posts sorted by date descending, omitting the heavy content field
    const posts = await collection
      .find({ published: true })
      .sort({ date: -1 })
      .project({ content: 0 })
      .toArray();

    // Map to plain objects and ensure type safety
    const serializedPosts = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date,
      tags: post.tags,
      readTime: post.readTime,
      image: post.image || ''
    }));

    return {
      posts: serializedPosts
    };
  } catch (error) {
    console.error('Error loading blog posts from MongoDB:', error);
    return {
      posts: []
    };
  }
};

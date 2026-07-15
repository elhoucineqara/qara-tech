import { error, redirect } from '@sveltejs/kit';
import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const authenticated = verifyAdminToken(cookies.get(ADMIN_COOKIE));
  if (!authenticated) {
    throw redirect(303, '/admin');
  }

  try {
    const collection = await getCollection(COLLECTIONS.BLOG_POSTS);
    const postsCursor = await collection.find({}).sort({ date: -1 });
    const posts = await postsCursor.toArray();

    const serializedPosts = posts.map(post => ({
      _id: post._id.toString(),
      slug: post.slug,
      title: post.title,
      author: post.author,
      date: post.date,
      published: post.published,
      readTime: post.readTime
    }));

    return {
      posts: serializedPosts
    };
  } catch (err) {
    console.error('Error loading articles in admin:', err);
    throw error(500, 'Erreur lors du chargement des articles');
  }
};

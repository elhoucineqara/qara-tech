import type { Document } from 'mongodb';
import { getDb } from '$lib/server/mongodb';

export const COLLECTIONS = {
	CONTACT_MESSAGES: 'contact_messages',
	VISITS: 'visits',
	BLOG_POSTS: 'blog_posts'
} as const;

let initPromise: Promise<void> | null = null;

async function createIndexes(): Promise<void> {
	const db = await getDb();

	const contactMessages = db.collection(COLLECTIONS.CONTACT_MESSAGES);
	await contactMessages.createIndex({ id: 1 }, { unique: true });
	await contactMessages.createIndex({ createdAt: -1 });
	await contactMessages.createIndex({ read: 1 });
	await contactMessages.createIndex({ email: 1 });

	const visits = db.collection(COLLECTIONS.VISITS);
	await visits.createIndex({ id: 1 }, { unique: true });
	await visits.createIndex({ createdAt: -1 });
	await visits.createIndex({ countryCode: 1 });
	await visits.createIndex({ path: 1 });
	await visits.createIndex({ visitorId: 1 });
	await visits.createIndex({ device: 1 });

	const blogPosts = db.collection(COLLECTIONS.BLOG_POSTS);
	await blogPosts.createIndex({ slug: 1 }, { unique: true });
	await blogPosts.createIndex({ date: -1 });
	await blogPosts.createIndex({ published: 1 });
}

export async function ensureDbCollections(): Promise<void> {
	if (!initPromise) {
		initPromise = createIndexes().catch((error) => {
			initPromise = null;
			throw error;
		});
	}
	return initPromise;
}

export async function getCollection<T extends Document>(name: string) {
	await ensureDbCollections();
	const db = await getDb();
	return db.collection<T>(name);
}

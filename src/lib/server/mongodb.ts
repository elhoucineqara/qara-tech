import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';

const globalForMongo = globalThis as typeof globalThis & {
	_mongoClientPromise?: Promise<MongoClient>;
};

function getMongoUri(): string {
	const uri = env.MONGODB_URI?.trim();
	if (!uri) {
		throw new Error('MONGODB_URI is not configured');
	}
	return uri;
}

function getDbNameFromUri(uri: string): string | null {
	const match = uri.match(/mongodb(?:\+srv)?:\/\/[^/]+\/([^/?]+)/);
	return match?.[1] ?? null;
}

function getDbName(): string {
	if (env.MONGODB_DB_NAME?.trim()) {
		return env.MONGODB_DB_NAME.trim();
	}
	return getDbNameFromUri(getMongoUri()) ?? 'qaratech';
}

function createClient(): Promise<MongoClient> {
	const client = new MongoClient(getMongoUri());
	return client.connect();
}

function getClientPromise(): Promise<MongoClient> {
	if (!globalForMongo._mongoClientPromise) {
		globalForMongo._mongoClientPromise = createClient().catch((error) => {
			globalForMongo._mongoClientPromise = undefined;
			throw error;
		});
	}
	return globalForMongo._mongoClientPromise;
}

export async function getDb() {
	const client = await getClientPromise();
	return client.db(getDbName());
}

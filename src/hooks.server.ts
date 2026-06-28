import { extractVisitMeta, shouldTrackVisit } from '$lib/server/visitor-meta';
import { ensureDbCollections } from '$lib/server/db-collections';
import { recordVisit } from '$lib/server/visitors';
import type { Handle } from '@sveltejs/kit';

let dbReady = false;

export const handle: Handle = async ({ event, resolve }) => {
	if (!dbReady) {
		dbReady = true;
		ensureDbCollections().catch((error) => {
			console.error('MongoDB init error:', error);
			dbReady = false;
		});
	}

	if (shouldTrackVisit(event)) {
		const meta = extractVisitMeta(event);
		recordVisit(meta).catch((error) => {
			console.error('Visitor tracking error:', error);
		});
	}

	return resolve(event);
};

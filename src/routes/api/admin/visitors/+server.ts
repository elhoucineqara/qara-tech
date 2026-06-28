import { json } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import { getVisitorStats } from '$lib/server/visitors';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	if (!verifyAdminToken(cookies.get(ADMIN_COOKIE))) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const stats = await getVisitorStats();
	return json({ stats });
};

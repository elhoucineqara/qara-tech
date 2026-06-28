import { json } from '@sveltejs/kit';
import {
	ADMIN_COOKIE,
	checkAdminPassword,
	createAdminToken
} from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { password } = await request.json();

	if (!password || !checkAdminPassword(String(password))) {
		return json({ error: 'Invalid password' }, { status: 401 });
	}

	cookies.set(ADMIN_COOKIE, createAdminToken(), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	});

	return json({ success: true });
};

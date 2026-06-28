import { redirect } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const authenticated = verifyAdminToken(cookies.get(ADMIN_COOKIE));

	if (
		(url.pathname.startsWith('/admin/messages') || url.pathname.startsWith('/admin/visitors')) &&
		!authenticated
	) {
		throw redirect(303, '/admin');
	}

	if (url.pathname === '/admin' && authenticated) {
		throw redirect(303, '/admin/messages');
	}

	return { authenticated };
};

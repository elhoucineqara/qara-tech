import { json } from '@sveltejs/kit';
import {
	deleteContactMessage,
	getContactMessages,
	markMessageRead
} from '$lib/server/contact-messages';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import type { RequestHandler } from './$types';

function unauthorized() {
	return json({ error: 'Unauthorized' }, { status: 401 });
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!verifyAdminToken(cookies.get(ADMIN_COOKIE))) return unauthorized();
	const messages = await getContactMessages();
	return json({ messages });
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
	if (!verifyAdminToken(cookies.get(ADMIN_COOKIE))) return unauthorized();

	const { id, action } = await request.json();
	if (!id || action !== 'read') {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	const ok = await markMessageRead(String(id));
	if (!ok) return json({ error: 'Message not found' }, { status: 404 });
	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	if (!verifyAdminToken(cookies.get(ADMIN_COOKIE))) return unauthorized();

	const { id } = await request.json();
	if (!id) return json({ error: 'Invalid request' }, { status: 400 });

	const ok = await deleteContactMessage(String(id));
	if (!ok) return json({ error: 'Message not found' }, { status: 404 });
	return json({ success: true });
};

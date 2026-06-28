import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const ADMIN_COOKIE = 'qara_admin';

function adminPassword(): string {
	return env.ADMIN_PASSWORD || 'qaratech2026';
}

export function createAdminToken(): string {
	return createHmac('sha256', adminPassword()).update('qara-admin-session').digest('hex');
}

export function verifyAdminToken(token: string | undefined): boolean {
	if (!token) return false;
	try {
		const expected = createAdminToken();
		const a = Buffer.from(token);
		const b = Buffer.from(expected);
		if (a.length !== b.length) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}

export function checkAdminPassword(password: string): boolean {
	const expected = adminPassword();
	try {
		const a = Buffer.from(password);
		const b = Buffer.from(expected);
		if (a.length !== b.length) return false;
		return timingSafeEqual(a, b);
	} catch {
		return false;
	}
}

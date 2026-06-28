import type { RequestEvent } from '@sveltejs/kit';

export interface VisitMeta {
	visitorId: string;
	path: string;
	country: string;
	countryCode: string;
	city: string;
	region: string;
	browser: string;
	os: string;
	device: 'mobile' | 'tablet' | 'desktop';
	referrer: string;
	language: string;
}

const VISITOR_COOKIE = 'qara_vid';
const COUNTRY_NAMES = new Intl.DisplayNames(['fr'], { type: 'region' });

function countryName(code: string): string {
	if (!code || code === 'XX') return 'Inconnu';
	try {
		return COUNTRY_NAMES.of(code.toUpperCase()) ?? code;
	} catch {
		return code;
	}
}

function parseUserAgent(ua: string): Pick<VisitMeta, 'browser' | 'os' | 'device'> {
	const device = /iPad|Tablet/i.test(ua)
		? 'tablet'
		: /Mobile|Android|iPhone/i.test(ua)
			? 'mobile'
			: 'desktop';

	let browser = 'Autre';
	if (/Edg\//i.test(ua)) browser = 'Edge';
	else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
	else if (/Firefox\//i.test(ua)) browser = 'Firefox';
	else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';

	let os = 'Autre';
	if (/Windows/i.test(ua)) os = 'Windows';
	else if (/Mac OS X/i.test(ua)) os = 'macOS';
	else if (/Android/i.test(ua)) os = 'Android';
	else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
	else if (/Linux/i.test(ua)) os = 'Linux';

	return { browser, os, device };
}

function getCountryCode(request: Request): string {
	return (
		request.headers.get('x-vercel-ip-country') ||
		request.headers.get('cf-ipcountry') ||
		'XX'
	).toUpperCase();
}

export function getOrCreateVisitorId(event: RequestEvent): string {
	const existing = event.cookies.get(VISITOR_COOKIE);
	if (existing) return existing;

	const id = crypto.randomUUID();
	event.cookies.set(VISITOR_COOKIE, id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 365,
		secure: process.env.NODE_ENV === 'production'
	});
	return id;
}

export function extractVisitMeta(event: RequestEvent): VisitMeta {
	const { request, url } = event;
	const ua = request.headers.get('user-agent') ?? '';
	const countryCode = getCountryCode(request);
	const { browser, os, device } = parseUserAgent(ua);

	return {
		visitorId: getOrCreateVisitorId(event),
		path: url.pathname,
		countryCode,
		country: countryName(countryCode),
		city: request.headers.get('x-vercel-ip-city') ?? '',
		region: request.headers.get('x-vercel-ip-country-region') ?? '',
		browser,
		os,
		device,
		referrer: request.headers.get('referer') ?? '',
		language: request.headers.get('accept-language')?.split(',')[0]?.trim() ?? ''
	};
}

export function shouldTrackVisit(event: RequestEvent): boolean {
	const { method, url } = event.request;
	if (method !== 'GET') return false;

	const path = url.pathname;
	if (
		path.startsWith('/api/') ||
		path.startsWith('/admin') ||
		path.startsWith('/_app') ||
		path.includes('.')
	) {
		return false;
	}

	const purpose = event.request.headers.get('purpose') ?? event.request.headers.get('sec-purpose') ?? '';
	if (/prefetch|preview/i.test(purpose)) return false;

	const ua = event.request.headers.get('user-agent') ?? '';
	if (/bot|crawl|spider|slurp|facebookexternalhit/i.test(ua)) return false;

	return true;
}

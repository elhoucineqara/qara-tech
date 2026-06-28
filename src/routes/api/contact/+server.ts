import { json } from '@sveltejs/kit';
import { addContactMessage } from '$lib/server/contact-messages';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.firstName || !data.lastName || !data.email || !data.message) {
			return json({ error: 'All fields are required' }, { status: 400 });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		await addContactMessage({
			firstName: String(data.firstName).trim(),
			lastName: String(data.lastName).trim(),
			email: String(data.email).trim(),
			phone: data.phone ? String(data.phone).trim() : '',
			message: String(data.message).trim()
		});

		return json({
			success: true,
			message: 'Your message has been sent successfully! I will get back to you soon.'
		});
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
	}
};

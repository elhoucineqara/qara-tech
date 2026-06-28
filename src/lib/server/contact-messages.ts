import { getDb } from '$lib/server/mongodb';

export interface ContactMessage {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
	createdAt: string;
	read: boolean;
}

const COLLECTION = 'contact_messages';

async function collection() {
	const db = await getDb();
	return db.collection<ContactMessage>(COLLECTION);
}

export async function addContactMessage(
	data: Pick<ContactMessage, 'firstName' | 'lastName' | 'email' | 'phone' | 'message'>
): Promise<ContactMessage> {
	const entry: ContactMessage = {
		...data,
		phone: data.phone || '',
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		read: false
	};

	await (await collection()).insertOne(entry);
	return entry;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
	return (await collection()).find({}).sort({ createdAt: -1 }).toArray();
}

export async function markMessageRead(id: string): Promise<boolean> {
	const result = await (await collection()).updateOne({ id }, { $set: { read: true } });
	return result.matchedCount > 0;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
	const result = await (await collection()).deleteOne({ id });
	return result.deletedCount > 0;
}

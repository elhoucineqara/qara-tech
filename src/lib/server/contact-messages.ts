import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { head, put } from '@vercel/blob';
import { env } from '$env/dynamic/private';

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

const BLOB_PATH = 'contact-messages.json';
const DATA_DIR = join(process.cwd(), 'data');
const FILE_PATH = join(DATA_DIR, 'contact-messages.json');

function useBlobStorage(): boolean {
	return Boolean(env.BLOB_READ_WRITE_TOKEN);
}

function parseMessages(raw: string): ContactMessage[] {
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

async function readMessagesFromBlob(): Promise<ContactMessage[]> {
	try {
		const meta = await head(BLOB_PATH);
		const res = await fetch(meta.url);
		if (!res.ok) return [];
		return parseMessages(await res.text());
	} catch {
		return [];
	}
}

async function writeMessagesToBlob(messages: ContactMessage[]): Promise<void> {
	await put(BLOB_PATH, JSON.stringify(messages, null, 2), {
		access: 'private',
		addRandomSuffix: false,
		allowOverwrite: true,
		contentType: 'application/json'
	});
}

async function readMessagesFromFile(): Promise<ContactMessage[]> {
	try {
		const raw = await readFile(FILE_PATH, 'utf-8');
		return parseMessages(raw);
	} catch {
		return [];
	}
}

async function writeMessagesToFile(messages: ContactMessage[]): Promise<void> {
	await mkdir(DATA_DIR, { recursive: true });
	await writeFile(FILE_PATH, JSON.stringify(messages, null, 2), 'utf-8');
}

async function readMessages(): Promise<ContactMessage[]> {
	if (useBlobStorage()) return readMessagesFromBlob();
	return readMessagesFromFile();
}

async function writeMessages(messages: ContactMessage[]): Promise<void> {
	if (useBlobStorage()) {
		await writeMessagesToBlob(messages);
		return;
	}
	await writeMessagesToFile(messages);
}

export async function addContactMessage(
	data: Pick<ContactMessage, 'firstName' | 'lastName' | 'email' | 'phone' | 'message'>
): Promise<ContactMessage> {
	const messages = await readMessages();
	const entry: ContactMessage = {
		...data,
		phone: data.phone || '',
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		read: false
	};
	messages.unshift(entry);
	await writeMessages(messages);
	return entry;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
	return readMessages();
}

export async function markMessageRead(id: string): Promise<boolean> {
	const messages = await readMessages();
	const index = messages.findIndex((m) => m.id === id);
	if (index === -1) return false;
	messages[index].read = true;
	await writeMessages(messages);
	return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
	const messages = await readMessages();
	const filtered = messages.filter((m) => m.id !== id);
	if (filtered.length === messages.length) return false;
	await writeMessages(filtered);
	return true;
}

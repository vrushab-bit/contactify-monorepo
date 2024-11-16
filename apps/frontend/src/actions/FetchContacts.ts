'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

interface Contact {
	id: string;
	name: string;
	jobTitle: string;
	company: string;
	avatar: string;
	phoneNumbers: { number: string; type: string; isPrimary: boolean }[];
	emails: { address: string; type: string; isPrimary: boolean }[];
}

export async function fetchContacts(): Promise<{
	contacts: Contact[] | null;
	error: string | null;
}> {
	try {
		const { userId, getToken } = await auth();

		if (!userId) {
			return { contacts: null, error: 'User not authenticated' };
		}

		const token = await getToken();

		const response = await fetch(
			`http://localhost:5000/api/contact?userId=${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				next: { revalidate: 60 }, // Revalidate every 60 seconds
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch contacts');
		}

		const res = await response.json();

		const contacts: Contact[] = res.data;

		revalidatePath('/contacts');

		return { contacts, error: null };
	} catch (error) {
		console.error('Error fetching contacts:', error);
		return {
			contacts: null,
			error: 'Failed to fetch contacts. Please try again later.',
		};
	}
}

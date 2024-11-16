'use server';

import { auth } from '@clerk/nextjs/server';

interface Contact {
	id: string;
	name: string;
	jobTitle: string | null;
	company: string | null;
	avatar: string | null;
	phoneNumbers: {
		id: string;
		number: string;
		type: string;
		isPrimary: boolean;
	}[];
	emails: {
		id: string;
		address: string;
		type: string;
		isPrimary: boolean;
	}[];
}

export async function fetchContactByContactId(
	contactId: string
): Promise<{ contact: Contact | null; error: string | null }> {
	try {
		const { userId, getToken } = await auth();

		if (!userId) {
			return { contact: null, error: 'User not authenticated' };
		}

		const token = await getToken();
		const response = await fetch(
			`http://localhost:5000/api/contact/${contactId}?userId=${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			if (response.status === 404) {
				return { contact: null, error: 'Contact not found' };
			}
			throw new Error('Failed to fetch contact');
		}

		const data = await response.json();
		return { contact: data.data, error: null };
	} catch (error) {
		console.error('Error fetching contact:', error);
		return {
			contact: null,
			error: 'Failed to fetch contact. Please try again later.',
		};
	}
}

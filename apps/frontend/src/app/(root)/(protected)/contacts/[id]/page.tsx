import { fetchContactByContactId } from '@/actions/FetchSingleContact';
import { notFound } from 'next/navigation';
import ContactDetailsClient from './_components/ContactDetails';

export default async function ContactDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const { contact, error } = await fetchContactByContactId(params.id);

	if (error) {
		console.error(error);
		notFound();
	}

	if (!contact) {
		notFound();
	}

	return <ContactDetailsClient contact={contact} />;
}

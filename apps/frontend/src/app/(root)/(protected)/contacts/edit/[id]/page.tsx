import EditContactForm from './_components/EditContactForm';
import { Box, Container, Typography } from '@mui/material';
import { fetchContactByContactId } from '@/actions/FetchSingleContact';
import { notFound } from 'next/navigation';

async function EditContactPage({ params }: { params: { id: string } }) {
	const { contact, error } = await fetchContactByContactId(params.id);

	if (error) {
		console.error(error);
		notFound();
	}

	if (!contact) {
		notFound();
	}

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography variant='h4'>Edit Contact</Typography>
				</Box>

				<Box>
					<Typography
						component='span'
						color='primary'
						sx={{
							pb: 1,
							px: 0.5,
							borderBottom: '2px solid #6366F1',
							fontWeight: 500,
						}}
					>
						Contact Details for {contact.name}
					</Typography>
				</Box>
			</Box>
			<Box>
				<EditContactForm contact={contact} />;
			</Box>
		</Container>
	);
}

export default EditContactPage;

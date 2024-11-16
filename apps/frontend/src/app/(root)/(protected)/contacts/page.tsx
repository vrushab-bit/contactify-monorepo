import { Container, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import ContactTable from './_components/ContactsTable';
import { fetchContacts } from '@/actions/FetchContacts';

export default async function ContactsPage() {
	const { contacts, error } = await fetchContacts();

	if (error) {
		return <Typography color='error'>{error}</Typography>;
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
					<Typography variant='h4'>Contacts</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button size='small' variant='contained' href='/contacts/add'>
							<AddIcon />
							<Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
								Add Contact
							</Typography>
						</Button>
					</Box>
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
						List of All The Contacts
					</Typography>
				</Box>
			</Box>
			<Box>
				<ContactTable initialContacts={contacts || []} />
			</Box>
		</Container>
	);
}

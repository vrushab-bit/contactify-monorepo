'use client';

import { useState } from 'react';
import axios from 'axios';
import {
	Breadcrumbs,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Link,
	Stack,
	Typography,
	Snackbar,
	Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import DetailHeader from './DetailHeader';
import ContactCard from './ContactCard';
import EmailCard from './EmailCard';
import InformationCard from './InformationCard';
import { useAuth } from '@clerk/clerk-react';
import { revalidateEndpoint } from '@/actions/revalidate';

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

interface ContactDetailsClientProps {
	contact: Contact;
}

function ContactDetailsClient({ contact }: ContactDetailsClientProps) {
	const router = useRouter();
	const [openDialog, setOpenDialog] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { userId, getToken } = useAuth();
	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: 'success' | 'error';
	}>({
		open: false,
		message: '',
		severity: 'success',
	});

	const handleEdit = () => {
		router.push(`/contacts/edit/${contact.id}`);
	};

	const handleDelete = () => {
		setOpenDialog(true);
	};

	const confirmDelete = async () => {
		setIsDeleting(true);
		try {
			const token = await getToken();
			await axios.delete(
				`http://localhost:5000/api/contact/${contact.id}?userId=${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setSnackbar({
				open: true,
				message: 'Contact deleted successfully',
				severity: 'success',
			});
			setOpenDialog(false);
			await revalidateEndpoint('/contacts');
			router.push('/contacts');
		} catch (error) {
			console.error('Error deleting contact:', error);
			setSnackbar({
				open: true,
				message: 'Error deleting contact',
				severity: 'error',
			});
		} finally {
			setIsDeleting(false);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<Container>
			<Breadcrumbs sx={{ mb: 4 }}>
				<Link underline='hover' color='inherit' href='/contacts'>
					Contacts
				</Link>
				<Typography color='text.primary'>{contact.name}</Typography>
			</Breadcrumbs>

			<Stack spacing={4}>
				<DetailHeader
					avatar={contact.avatar || ''}
					company={contact.company || ''}
					jobTitle={contact.jobTitle || ''}
					name={contact.name}
				/>

				<Stack direction='row' spacing={2} justifyContent='flex-end'>
					<Button
						variant='outlined'
						startIcon={<EditIcon />}
						onClick={handleEdit}
					>
						Edit Contact
					</Button>
					<Button
						variant='outlined'
						color='error'
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
					>
						Delete Contact
					</Button>
				</Stack>

				<Divider />
				<Stack spacing={3}>
					<ContactCard phoneNumbers={contact.phoneNumbers} />
					<EmailCard emails={contact.emails} />
					<InformationCard
						jobTitle={contact.jobTitle || ''}
						company={contact.company || ''}
					/>
				</Stack>
			</Stack>

			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle id='alert-dialog-title'>{'Delete Contact'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						Are you sure you want to delete this contact? This action cannot be
						undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)} disabled={isDeleting}>
						Cancel
					</Button>
					<Button
						onClick={confirmDelete}
						color='error'
						autoFocus
						disabled={isDeleting}
					>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default ContactDetailsClient;

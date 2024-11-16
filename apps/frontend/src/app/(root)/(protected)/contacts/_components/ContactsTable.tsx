'use client';

import {
	Avatar,
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface Contact {
	id: string;
	name: string;
	jobTitle: string;
	company: string;
	avatar: string;
	phoneNumbers: { number: string; type: string; isPrimary: boolean }[];
	emails: { address: string; type: string; isPrimary: boolean }[];
}

interface ContactTableProps {
	initialContacts: Contact[];
}

export default function ContactTable({ initialContacts }: ContactTableProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const router = useRouter();

	const [contacts] = useState<Contact[]>(initialContacts);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [page, setPage] = useState(0);
	const [filterText, setFilterText] = useState('');

	const filteredContacts = useMemo(() => {
		return contacts.filter((contact) => {
			const searchText = filterText.toLowerCase();
			return (
				contact.name.toLowerCase().includes(searchText) ||
				contact.jobTitle.toLowerCase().includes(searchText) ||
				contact.company.toLowerCase().includes(searchText) ||
				contact.phoneNumbers.some((phone) =>
					phone.number.toLowerCase().includes(searchText)
				) ||
				contact.emails.some((email) =>
					email.address.toLowerCase().includes(searchText)
				)
			);
		});
	}, [contacts, filterText]);

	const visibleRows = useMemo(() => {
		const startIndex = page * rowsPerPage;
		return filteredContacts.slice(startIndex, startIndex + rowsPerPage);
	}, [filteredContacts, page, rowsPerPage]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterText(e.target.value);
		setPage(0);
	};

	return (
		<TableContainer
			component={Paper}
			elevation={0}
			sx={{
				border: '1px solid',
				borderColor: 'divider',
				width: '100%',
				overflowX: 'auto',
			}}
		>
			<Container>
				<TextField
					label='Filter Contacts'
					variant='outlined'
					size='small'
					sx={{
						my: 2,
					}}
					onChange={handleFilterChange}
					value={filterText}
				/>
			</Container>
			<Table sx={{ minWidth: isMobile ? 'unset' : 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						{!isMobile && (
							<>
								<TableCell>Primary Contact</TableCell>
								<TableCell>Primary Email</TableCell>
								<TableCell>Job Title</TableCell>
								<TableCell>Company</TableCell>
							</>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{visibleRows.map((contact) => (
						<TableRow
							key={contact.id}
							sx={{
								cursor: 'pointer',
							}}
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/contacts/${contact.id}`);
							}}
						>
							<TableCell component='th' scope='row'>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
									<Avatar src={contact.avatar} alt={contact.name}>
										{contact.name.charAt(0)}
									</Avatar>
									<Typography>{contact.name}</Typography>
								</Box>
							</TableCell>
							{!isMobile && (
								<>
									<TableCell>
										{contact.phoneNumbers.find((phone) => phone.isPrimary)
											?.number || ''}
									</TableCell>
									<TableCell>
										{contact.emails.find((email) => email.isPrimary)?.address ||
											''}
									</TableCell>
									<TableCell>{contact.jobTitle}</TableCell>
									<TableCell>{contact.company}</TableCell>
								</>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={filteredContacts.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
}

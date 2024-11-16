import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import prisma from '@/utils/db';

async function Dashboard() {
	const sum = await prisma.contact.count();
	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography variant='h4'>Dashboard</Typography>
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
						Overview
					</Typography>
				</Box>
			</Box>
			<Paper sx={{ maxWidth: 300, px: 2, py: 3 }}>
				<Typography color='text.secondary' gutterBottom>
					Total Contacts
				</Typography>
				<Typography variant='h4'>{sum}</Typography>
			</Paper>
		</>
	);
}

export default Dashboard;

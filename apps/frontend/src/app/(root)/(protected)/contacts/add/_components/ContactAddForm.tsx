'use client';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Select,
	Stack,
	TextField,
	Typography,
	useTheme,
	useMediaQuery,
	Snackbar,
	Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { contactAddSchema } from '@/schemas/ContactAddSchema';
import { contactAddSchemaType } from '@/types/formTypes';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function ContactAddForm() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [isPending, setIsPending] = useState(false);
	const { getToken, userId } = useAuth();
	const router = useRouter();
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error',
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<contactAddSchemaType>({
		resolver: zodResolver(contactAddSchema),
		defaultValues: {
			phoneNumbers: [{ number: '', type: 'Personal', isPrimary: true }],
			emails: [{ address: '', type: 'Personal', isPrimary: true }],
		},
	});

	const {
		fields: phoneFields,
		append: appendPhone,
		remove: removePhone,
	} = useFieldArray({
		control,
		name: 'phoneNumbers',
	});

	const {
		fields: emailFields,
		append: appendEmail,
		remove: removeEmail,
	} = useFieldArray({
		control,
		name: 'emails',
	});

	const onSubmit = async (data: contactAddSchemaType) => {
		try {
			setIsPending(true);
			const token = await getToken();
			const response = await axios.post(
				'http://localhost:5000/api/contact',
				{ data, userId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status !== 201) {
				console.error('Error adding contact:', response.data);
				setSnackbar({
					open: true,
					message: 'Error adding contact. Please try again.',
					severity: 'error',
				});
				return;
			}
			console.log('Contact added successfully:', response.data);
			setSnackbar({
				open: true,
				message: 'Contact added successfully!',
				severity: 'success',
			});

			router.push('/contacts');
		} catch (error) {
			console.error('Error adding contact:', error);
			setSnackbar({
				open: true,
				message: 'Error adding contact. Please try again.',
				severity: 'error',
			});
		} finally {
			setIsPending(false);
		}
	};

	const handleCloseSnackbar = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<Box>
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<Controller
							name='name'
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									label='Name'
									error={!!errors.name}
									helperText={errors.name?.message}
									disabled={isPending}
								/>
							)}
						/>
						<Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
							<Controller
								name='jobTitle'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Job Title'
										disabled={isPending}
									/>
								)}
							/>
							<Controller
								name='company'
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Company'
										disabled={isPending}
									/>
								)}
							/>
						</Stack>

						<Typography variant='h6' gutterBottom>
							Phone Numbers
						</Typography>
						{phoneFields.map((field, index) => (
							<Stack
								key={field.id}
								direction={isMobile ? 'column' : 'row'}
								spacing={2}
								alignItems='flex-start'
							>
								<Controller
									name={`phoneNumbers.${index}.number`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Phone Number'
											error={!!errors.phoneNumbers?.[index]?.number}
											helperText={errors.phoneNumbers?.[index]?.number?.message}
											fullWidth
											disabled={isPending}
										/>
									)}
								/>
								<Controller
									name={`phoneNumbers.${index}.type`}
									control={control}
									render={({ field }) => (
										<FormControl fullWidth>
											<InputLabel>Type</InputLabel>
											<Select {...field} disabled={isPending} label='Type'>
												<option value='Personal'>Personal</option>
												<option value='Work'>Work</option>
											</Select>
										</FormControl>
									)}
								/>
								<Controller
									name={`phoneNumbers.${index}.isPrimary`}
									control={control}
									render={({ field }) => (
										<FormControl fullWidth>
											<InputLabel>Primary</InputLabel>
											<Select {...field} disabled={isPending} label='Primary'>
												<option value='true'>Yes</option>
												<option value='false'>No</option>
											</Select>
										</FormControl>
									)}
								/>
								<IconButton onClick={() => removePhone(index)} color='error'>
									<DeleteIcon />
								</IconButton>
							</Stack>
						))}
						<Button
							startIcon={<AddIcon />}
							onClick={() =>
								appendPhone({ number: '', type: 'Personal', isPrimary: false })
							}
							disabled={isPending}
						>
							Add Phone Number
						</Button>

						<Typography variant='h6' gutterBottom>
							Email Addresses
						</Typography>
						{emailFields.map((field, index) => (
							<Stack
								key={field.id}
								direction={isMobile ? 'column' : 'row'}
								spacing={2}
								alignItems='flex-start'
							>
								<Controller
									name={`emails.${index}.address`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label='Email Address'
											error={!!errors.emails?.[index]?.address}
											helperText={errors.emails?.[index]?.address?.message}
											fullWidth
											disabled={isPending}
										/>
									)}
								/>
								<Controller
									name={`emails.${index}.type`}
									control={control}
									render={({ field }) => (
										<FormControl fullWidth>
											<InputLabel>Type</InputLabel>
											<Select {...field} label='Type' disabled={isPending}>
												<option value='Personal'>Personal</option>
												<option value='Work'>Work</option>
											</Select>
										</FormControl>
									)}
								/>
								<Controller
									name={`emails.${index}.isPrimary`}
									control={control}
									render={({ field }) => (
										<FormControl fullWidth>
											<InputLabel>Primary</InputLabel>
											<Select {...field} label='Primary' disabled={isPending}>
												<option value='true'>Yes</option>
												<option value='false'>No</option>
											</Select>
										</FormControl>
									)}
								/>
								<IconButton
									disabled={isPending}
									onClick={() => removeEmail(index)}
									color='error'
								>
									<DeleteIcon />
								</IconButton>
							</Stack>
						))}
						<Button
							startIcon={<AddIcon />}
							onClick={() =>
								appendEmail({ address: '', type: 'Personal', isPrimary: false })
							}
						>
							Add Email Address
						</Button>

						<Button
							type='submit'
							variant='contained'
							color='primary'
							sx={{ mt: 2 }}
						>
							Add Contact
						</Button>
					</Stack>
				</form>
			</Box>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default ContactAddForm;

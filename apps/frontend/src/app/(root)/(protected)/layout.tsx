import { Box, Container } from '@mui/material';
import Navbar from '@/components/Navbar';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import prisma from '@/utils/db';

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();
	if (!userId) return notFound();

	try {
		await prisma.user.findUniqueOrThrow({
			where: { userId },
		});
	} catch (e) {
		await prisma.user.create({
			data: { userId },
		});
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<Navbar />
			<Container
				sx={{ py: 1.5, display: 'flex', flexDirection: 'column', gap: 5 }}
			>
				{children}
			</Container>
		</Box>
	);
}

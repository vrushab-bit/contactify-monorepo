'use client';
import theme from '@/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ClerkProvider } from '@clerk/nextjs';
import { useState } from 'react';

type Props = {
	children: React.ReactNode;
};

function AppProvider({ children }: Props) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ClerkProvider>{children}</ClerkProvider>
		</ThemeProvider>
	);
}

export default AppProvider;

import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/components/AppProvider';

export const metadata: Metadata = {
	title: 'Contact-Management',
	description: 'A Simple Contact Management SAAS Application',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}

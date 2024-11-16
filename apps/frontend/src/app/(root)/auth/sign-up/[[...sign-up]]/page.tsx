import { SignUp } from '@clerk/nextjs';
import { Container } from '@mui/material';

export default function Page() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignUp />
    </Container>
  );
}

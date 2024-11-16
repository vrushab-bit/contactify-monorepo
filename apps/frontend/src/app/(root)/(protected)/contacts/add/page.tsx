import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import ContactAddForm from './_components/ContactAddForm';

export default function AddContact() {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/contacts">
          Contacts
        </Link>
        <Typography color="text.primary">Add</Typography>
      </Breadcrumbs>

      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add a New Contact
        </Typography>
      </Box>
      <ContactAddForm />
    </Container>
  );
}

import { Email } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

type Props = {
  emails: {
    address: string;
    type: string; // Enumerate possible values for clarity
    isPrimary: boolean;
  }[];
};
function EmailCard({ emails }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="action" />
            <Typography variant="h6">Email Addresses</Typography>
          </Box>
          {emails.map((email, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Typography>{email.address}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={email.type} size="small" variant="outlined" />
                {email.isPrimary && (
                  <Chip label="Primary" size="small" color="primary" />
                )}
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EmailCard;

import { Phone } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';

type Props = {
  phoneNumbers: {
    number: string;
    type: string;
    isPrimary: boolean;
  }[];
};

function ContactCard({ phoneNumbers }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone color="action" />
            <Typography variant="h6">Phone Numbers</Typography>
          </Box>

          {phoneNumbers.map((phone, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Typography>+91 {phone.number}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={phone.type} size="small" variant="outlined" />
                {phone.isPrimary && (
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

export default ContactCard;

import { Work } from '@mui/icons-material';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
  jobTitle: string;
  company: string;
};

function InformationCard({ jobTitle, company }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Work color="action" />
            <Typography variant="h6">Professional Information</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Job Title
            </Typography>
            <Typography>{jobTitle}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Company
            </Typography>
            <Typography>{company}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default InformationCard;

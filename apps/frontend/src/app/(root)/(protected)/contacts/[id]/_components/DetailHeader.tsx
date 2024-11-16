'use client';
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

type Props = {
  avatar: string;
  name: string;
  jobTitle: string;
  company: string;
};

function DetailHeader({ avatar, name, jobTitle, company }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <Avatar src={avatar} alt={name} sx={{ width: 120, height: 120 }}>
        {name.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="h4" gutterBottom>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {jobTitle} at {company}
        </Typography>
      </Box>
    </Box>
  );
}

export default DetailHeader;

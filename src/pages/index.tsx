import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@/src/components/Link';
import Copyright from '@/src/components/Copyright';
import MainInfoCard from '@/src/components/MainInfoCard';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Button, Card, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Stack } from '@mui/system';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!session && (
          <Button
            className='mb-2 self-center w-fit'
            variant='outlined'
            color='secondary'
            startIcon={<FontAwesomeIcon icon={faSignIn} />}
            href="/auth/sign-in"
          >
            Sign In
          </Button>
        )}
        <MainInfoCard/>
      </Box>
    </Container>
  );
}
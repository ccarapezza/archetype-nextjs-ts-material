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
        {session?.user && (
          <>
              <Card className='p-2 my-2'>
                <Box className='flex'>
                  {session.user.image ?
                    <Avatar alt={session.user.image} src={session.user.image} />
                    :
                    <Avatar />
                  }
                  <Stack px={1}>
                    <Typography fontWeight={700}>{session.user.name}</Typography>
                    <Stack direction={'row'}>
                      <FontAwesomeIcon icon={faEnvelope}/>
                      <Typography component="span" sx={{fontSize: 12, pl: 1}} fontWeight={500}>{session.user.email}</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box className='flex justify-center'>
                  <Button
                    className='mt-1 self-center w-fit'
                    variant='outlined'
                    color='secondary'
                    startIcon={<FontAwesomeIcon icon={faSignOut} />}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Card>
          </>
        )}
        <Link href="/about" color="secondary" className="m-2">
          Go to the About page
        </Link>
        <Link href="/protected" color="secondary" className="m-2">
          Go to the Protected page
        </Link>
        <MainInfoCard/>
        <Copyright />
      </Box>
    </Container>
  );
}
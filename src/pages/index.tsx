import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainInfoCard from '@/src/components/MainInfoCard';
import { useSession } from 'next-auth/react';
import {  Button, Card } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return (
    <Container>
      <Box className='flex flex-col justify-center items-center my-5'>
        <Card className='flex flex-col justify-center items-center p-5'>
          <h1 className='text-2xl font-bold'>Loading...</h1>
        </Card>
      </Box>
    </Container>
  );

  if (status !== "authenticated"){
    return (
      <Container className='bg-slate-200 flex items-center justify-center w-100 max-w-none'>
        <Box className='flex flex-col justify-center items-center my-5'>
          <Button
            className='mb-4 self-center w-fit'
            variant='contained'
            color='primary'
            startIcon={<FontAwesomeIcon icon={faSignIn} />}
            href="/auth/sign-in"
          >
            Sign In
          </Button>
          <Box className="max-w-xl">
            <MainInfoCard/>
          </Box>
        </Box>
      </Container>
    );
  }else{
    <Container>
      <MainInfoCard/>
    </Container>
  }
  
  return (
    <Container className='bg-slate-200 flex items-center justify-center w-100 max-w-none'>
      <Button
        className='mb-2 self-center w-fit'
        variant='outlined'
        color='secondary'
        startIcon={<FontAwesomeIcon icon={faSignIn} />}
        href="/auth/sign-in"
      >
        Sign In
      </Button>
      <MainInfoCard/>
    </Container>
  )
}
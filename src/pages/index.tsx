import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainInfoCard from '@/src/components/MainInfoCard';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function Home() {
  const { status } = useSession();

  const router = useRouter();

  if (status !== "authenticated")
    return (
      <Container className='bg-slate-200 flex items-center justify-center w-100 max-w-none'>
        <Box className='flex flex-col justify-center items-center my-5'>
          <Button
            className='mb-4 self-center w-fit'
            variant='outlined'
            color='primary'
            startIcon={<FontAwesomeIcon icon={faSignIn} />}
            onClick={() => {
              router.push('/auth/sign-in')
            }}
          >
            Sign In
          </Button>
          <Box className="max-w-xl">
            <MainInfoCard/>
          </Box>
        </Box>
      </Container>
    );
  
    if(status === "authenticated")
      <Container>
        <MainInfoCard/>
      </Container>
}
import React from 'react'
import { signIn } from "next-auth/react"
import { ClientSafeProvider } from "next-auth/react/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@mui/material';

export default function GoogleForm({ provider }: { provider: ClientSafeProvider }) {
    return (
        <Button
            className='mb-2 self-center w-fit'
            variant='outlined'
            color='secondary'
            startIcon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={() => {signIn(provider.id, { callbackUrl: '/' })}}
        >
            Sign in with Google
        </Button>
    )
}
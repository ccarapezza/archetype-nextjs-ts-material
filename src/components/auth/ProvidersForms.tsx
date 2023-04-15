import React, { Fragment } from 'react'
import { signIn } from "next-auth/react"
import { LiteralUnion, ClientSafeProvider } from "next-auth/react/types"
import type { BuiltInProviderType } from "next-auth/providers";
import CredentialsForm from './providers/CredentialsForm';
import GoogleForm from './providers/GoogleForm';
import { Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faIdCard, faSquare } from '@fortawesome/free-solid-svg-icons';
import Link from '../Link';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function ProvidersForms({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> } ) {

    return (<>
        {providers && Object.values(providers).map((provider, index) => (
            <Fragment key={provider?.name}>
                {index!==0 && <Divider className='my-4'/>}
                <Typography className='pb-2'>
                    {(() => {
                        switch (provider?.id) {
                        case 'google':
                            return <FontAwesomeIcon icon={faGoogle} />;
                        case 'credentials':
                            return <FontAwesomeIcon icon={faIdCard} />
                        default:
                            return <FontAwesomeIcon icon={faSquare} />
                        }
                    })()}
                    <span className='px-2'>{provider?.name}</span>
                </Typography>
                {(() => {
                    switch (provider?.id) {
                        case 'google':
                            return <GoogleForm provider={provider} />;
                        case 'credentials':
                            return <CredentialsForm provider={provider} />
                        default:
                            return <button onClick={() => {signIn(provider.id, {callbackUrl: '/'})}}>Sign in with {provider.name}</button>
                        }
                })()}
            </Fragment>
        ))}
    </>)
}

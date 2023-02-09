import React from 'react'
import { signIn } from "next-auth/react"
import { LiteralUnion, ClientSafeProvider } from "next-auth/react/types"
import type { BuiltInProviderType } from "next-auth/providers";
import CredentialsForm from './providers/CredentialsForm';
import GoogleForm from './providers/GoogleForm';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Link from '../components/Link';

export default function ProvidersForms({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> } ) {
    return (<Container maxWidth="lg">
        <Card className='m-2'>
            <CardHeader title="Sign in" />
            <CardContent>
                {providers && Object.values(providers).map((provider) => (
                    <div key={provider?.name}>
                        <p><small>Provider: <b>{provider?.name}</b></small></p>
                        <div>
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
                        </div>
                    </div>
                ))}
                <Link href={'/'}>    
                    <IconButton>
                        <FontAwesomeIcon href="/" icon={faHouse}/>
                    </IconButton>
                </Link>
            </CardContent>
        </Card>
    </Container>
    )
}

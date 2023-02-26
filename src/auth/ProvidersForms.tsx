import React from 'react'
import { signIn } from "next-auth/react"
import { LiteralUnion, ClientSafeProvider } from "next-auth/react/types"
import type { BuiltInProviderType } from "next-auth/providers";
import CredentialsForm from './providers/CredentialsForm';
import GoogleForm from './providers/GoogleForm';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, AccordionSummaryProps, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faIdCard, faSquare } from '@fortawesome/free-solid-svg-icons';
import Link from '../components/Link';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function ProvidersForms({ providers }: { providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> } ) {
    const [expanded, setExpanded] = React.useState<string | false>(Object.values(providers)?.at(0)?.name || '');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        if(panel!=expanded){
            setExpanded(newExpanded ? panel : false);
        }
    };
    return (<Container maxWidth="lg">
        <Card className='m-2'>
            <CardHeader title="Sign in" />
            <CardContent>
                {providers && Object.values(providers).map((provider) => (
                    <Accordion style={{margin: 0}} square key={provider?.name} expanded={expanded === provider?.name} onChange={handleChange(provider?.name)} className="border-t-2">
                        <AccordionSummary aria-controls={provider?.name+"-content"} id={provider?.name+"-header"} >
                            <Typography>
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
                        </AccordionSummary>
                        <AccordionDetails>
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
                        </AccordionDetails>
                    </Accordion>
                ))}                
                <Link href={'/'}>    
                    <IconButton className='mt-4'>
                        <FontAwesomeIcon href="/" icon={faHouse}/>
                    </IconButton>
                </Link>
            </CardContent>
        </Card>
    </Container>
    )
}

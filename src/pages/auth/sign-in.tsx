import ProvidersForms from "@/src/components/auth/ProvidersForms";
import { getProviders } from "next-auth/react"
import { useSession } from "next-auth/react"
import type { GetServerSidePropsContext } from "next"
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import type { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from 'next/router'
import { Box, Card, CardContent, CardHeader, Container, IconButton } from "@mui/material";
import Link from "@/src/components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function SignIn({providers}: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>}) {
  const { status } = useSession();
  const router = useRouter()
  if(status === "authenticated") {
    console.log("Already authenticated. Redirecting...")
    router.push('/')
  }
  return (
    <Container className='bg-slate-200 flex items-center justify-center w-100 max-w-none'>
        <Card className='max-w-sm w-96'>
            <CardHeader title="Sign in" />
            <CardContent>             
                {providers?<ProvidersForms providers={providers}/>:<p>Loading...</p>}
                <Box className="flex justify-end">
                    <Link href={'/'} >    
                        <IconButton className='mt-4'>
                            <FontAwesomeIcon href="/" icon={faHouse}/>
                        </IconButton>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    </Container>

  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  }
}
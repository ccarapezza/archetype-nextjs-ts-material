import ProvidersForms from "@/src/auth/ProvidersForms";
import { getProviders } from "next-auth/react"
import type { GetServerSidePropsContext } from "next"
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import type { BuiltInProviderType } from "next-auth/providers";

export default function SignIn({providers}: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>}) {
    return (providers?<ProvidersForms providers={providers}/>:<p>Loading...</p>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  }
}
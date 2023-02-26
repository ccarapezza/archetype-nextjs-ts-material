import type { AdapterAccount } from "next-auth/adapters"
import { ProviderType } from "next-auth/providers";
export default class Account implements AdapterAccount {
    [x: string]: unknown;
    userId!: string;
    providerAccountId!: string;
    provider!: string;
    type!: ProviderType;
    access_token?: string | undefined;
    token_type?: string | undefined;
    id_token?: string | undefined;
    refresh_token?: string | undefined;
    scope?: string | undefined;
    expires_at?: number | undefined;
    session_state?: string | undefined;
    
}
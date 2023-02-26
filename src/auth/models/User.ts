import type { AdapterUser } from "next-auth/adapters"
export default class User implements AdapterUser {
    id!: string;
    email!: string;
    emailVerified!: Date | null;
    name?: string | null | undefined;
    image?: string | null | undefined;   
}
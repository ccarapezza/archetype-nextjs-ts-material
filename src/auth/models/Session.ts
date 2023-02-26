import type { AdapterSession } from "next-auth/adapters"
export default class Session implements AdapterSession {
    sessionToken!: string;
    userId!: string;
    expires!: Date;
    
}
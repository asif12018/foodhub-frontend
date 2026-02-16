 // or core package
import * as z from "zod";
import { createEnv } from '@t3-oss/env-nextjs';



export const env = createEnv({
    server: {
        BACKEND_URL: z.url(),
        FRONTEND_URL: z.url(),
        AUTH_URL: z.url(),
    },
    //client example
    client: {
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_TEST: z.string(),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST
    },
})
// @ts-check
import { z } from 'zod';

/**
 * Specify environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    DATABASE_AUTH_TOKEN: z.string(),
});

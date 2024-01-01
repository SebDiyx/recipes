import { Elysia, t } from 'elysia';
import { env } from './env';
import { getRecipeById } from './repositories/recipe';
import { api } from './controllers/*';

// Checking here to validate that the env vars are set
const isDevMode = env.NODE_ENV === 'development';

const app = new Elysia().use(api).listen(3000);
export type App = typeof app;

console.log(
    `🍜 Recipes app is running at ${app.server?.hostname}:${app.server?.port}`,
);

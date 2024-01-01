import Elysia from 'elysia';
import { recipeController } from './recipe';

export const api = new Elysia({
    prefix: '/api',
}).use(recipeController);

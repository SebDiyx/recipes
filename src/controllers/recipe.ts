import Elysia, { t } from 'elysia';
import { getRecipeById, getRecipes } from '../repositories/recipe';

export const recipeController = new Elysia({
    prefix: '/recipe',
})
    .get(
        '/:id',
        ({ params: { id } }) => {
            return getRecipeById(id);
        },
        {
            params: t.Object({
                id: t.Numeric(),
            }),
        },
    )
    .get(
        '/',
        ({ query }) => {
            return getRecipes(query.search);
        },
        {
            query: t.Object({
                search: t.Optional(t.String()),
            }),
        },
    )
    .post('/', () => 'TODO')
    .delete('/:id', () => 'TODO');

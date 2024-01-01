import { eq, ilike } from 'drizzle-orm';
import { db } from '../db';
import { ingredient, recipe } from '../db/schema';
import { NewRecipe } from '../db/schema/recipe';

// Queries --------------------------------------------------------------------
export async function getRecipeById(id: number) {
    return db.query.recipe.findFirst({
        where: eq(recipe.id, id),
        with: {
            author: true,
            ingredients: true,
        },
    });
}

// TODO: Eventually support custom queries (more than just title)
export async function getRecipes(title?: string) {
    return db.query.recipe.findMany({
        where: title ? ilike(recipe.title, title) : undefined,
        with: {
            author: true,
        },
    });
}

export function getRecipesPaged() {
    throw new Error('NOT IMPLEMENTED');
}
// ----------------------------------------------------------------------------

// Insert / Update / Delete ---------------------------------------------------
export async function createRecipe(recipeData: NewRecipe) {
    return db.insert(recipe).values(recipeData);
}

export async function updateRecipe() {
    // TODO: Will need to handle updating ingredients as well
    // db.update();
}

export async function deleteRecipe(id: number) {
    return db.delete(recipe).where(eq(recipe.id, id));
}
// ----------------------------------------------------------------------------

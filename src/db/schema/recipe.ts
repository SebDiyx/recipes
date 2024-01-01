import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { user } from './user';
import { NewIngredient, ingredient } from './ingredient';
import { New } from '../../utils/types';

export const recipe = sqliteTable('recipe', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    title: text('title').notNull(),
    description: text('description').notNull(),
    authorId: integer('author_id'),
});

export const recipeRelations = relations(recipe, ({ one, many }) => ({
    author: one(user, {
        fields: [recipe.authorId],
        references: [user.id],
    }),
    ingredients: many(ingredient),
}));

export type Recipe = typeof recipe.$inferSelect;
export type RecipeInsert = typeof recipe.$inferInsert;
export type NewRecipe = New<RecipeInsert> & {
    authorId: number;
    ingredients: NewIngredient[];
};

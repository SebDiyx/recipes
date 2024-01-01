import { relations } from 'drizzle-orm';
import {
    text,
    integer,
    sqliteTable,
    numeric,
    index,
} from 'drizzle-orm/sqlite-core';
import { recipe } from './recipe';
import { New } from '../../utils/types';
import { on } from 'events';

export const ingredient = sqliteTable(
    'ingredient',
    {
        id: integer('id').primaryKey(),
        recipeId: integer('recipe_id')
            // When a recipe is deleted, delete all of its ingredients
            .references(() => recipe.id, { onDelete: 'cascade' })
            .notNull(),
        unit: text('unit'), // Nullable because some ingredients don't have units (e.g. 1 egg)
        amount: numeric('amount').notNull(),
        name: text('name').notNull(),
    },
    (table) => ({
        recipeIdx: index('recipe_idx').on(table.recipeId),
    }),
);

export const ingredientRelations = relations(ingredient, ({ one }) => ({
    recipe: one(recipe, {
        fields: [ingredient.recipeId],
        references: [recipe.id],
    }),
}));

export type Ingredient = typeof ingredient.$inferSelect;
export type IngredientInsert = typeof ingredient.$inferInsert;
export type NewIngredient = New<IngredientInsert>;

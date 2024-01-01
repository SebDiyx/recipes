import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { recipe } from './recipe';

export const user = sqliteTable('user', {
    id: integer('id').primaryKey(),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
    recipes: many(recipe),
}));

export type User = typeof user.$inferSelect;

import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const singleTasks = pgTable('single_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  isCompleted: boolean('is_completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const routineTaskTemplates = pgTable('routine_task_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const routineTasks = pgTable('routine_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  isCompleted: boolean('is_completed').default(false),
  routineTaskTemplateId: uuid('routine_task_template_id').references(() => routineTaskTemplates.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

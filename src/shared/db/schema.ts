import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const role = pgTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
}));

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  userId: varchar("user_id", { length: 30 }).notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  role: varchar("role", { length: 20 }).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const userRoleRelations = relations(user, ({ one }) => ({
  role: one(role, {
    fields: [user.role],
    references: [role.name],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  materials: many(material),
}));

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const verificationRelations = relations(verification, ({}) => ({}));

export const material = pgTable("material", {
  id: serial("id").primaryKey(),
  lecturerId: text("lecturer_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  materialType: varchar("material_type", { length: 20 }).notNull(),
  content: text("content"),
  sourceUrl: text("source_url"),
  iconName: varchar("icon_name", { length: 100 }),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const materialRelations = relations(material, ({ one, many }) => ({
  lecturer: one(user, {
    fields: [material.lecturerId],
    references: [user.id],
  }),
  materialLevels: many(materialLevel),
}));

export const materialLevel = pgTable("material_level", {
  id: serial("id").primaryKey(),
  materialId: integer("material_id")
    .notNull()
    .references(() => material.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  levelOrder: integer("level_order").notNull(),
  createdAt: timestamp("created_at"),
});

export const materialLevelRelations = relations(
  materialLevel,
  ({ one, many }) => ({
    material: one(material, {
      fields: [materialLevel.materialId],
      references: [material.id],
    }),
    quizzes: many(quiz),
  })
);

export const quiz = pgTable("quiz", {
  id: serial("id").primaryKey(),
  materialLevelId: integer("material_level_id")
    .notNull()
    .references(() => materialLevel.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  durationMinutes: integer("duration_minutes"),
  totalScore: integer("total_score").default(0),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const quizRelations = relations(quiz, ({ one, many }) => ({
  materialLevel: one(materialLevel, {
    fields: [quiz.materialLevelId],
    references: [materialLevel.id],
  }),
  quizQuestions: many(quizQuestion),
}));

export const quizQuestion = pgTable("quiz_question", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => quiz.id, { onDelete: "cascade" }),
  questionText: text("question_text").notNull(),
  answerTemplate: text("answer_template"),
  maxScore: integer("max_score").default(100),
  questionOrder: integer("question_order"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const quizQuestionRelations = relations(
  quizQuestion,
  ({ one, many }) => ({
    quiz: one(quiz, {
      fields: [quizQuestion.quizId],
      references: [quiz.id],
    }),
    questionBlanks: many(questionBlank),
  })
);

export const questionBlank = pgTable("question_blank", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .notNull()
    .references(() => quizQuestion.id, { onDelete: "cascade" }),
  blankKey: varchar("blank_key", { length: 50 }).notNull(),
  correctAnswer: text("correct_answer").notNull(),
  alternativeAnswers: text("alternative_answers").array(),
  points: integer("points").default(1),
  caseSensitive: boolean("case_sensitive").default(false),
});

export const questionBlankRelations = relations(
  questionBlank,
  ({ one }) => ({
    question: one(quizQuestion, {
      fields: [questionBlank.questionId],
      references: [quizQuestion.id],
    }),
  })
);
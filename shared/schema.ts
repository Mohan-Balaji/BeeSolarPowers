import { pgTable, text, serial, integer, boolean, timestamp, json, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for admin and client access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("client"), // admin or client
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Installation tracking
export const installations = pgTable("installations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  status: text("status").notNull().default("pending"), // pending, in-progress, completed
  installationDate: timestamp("installation_date"),
  completionDate: timestamp("completion_date"),
  notes: text("notes"),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  discountPrice: numeric("discount_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Product categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewed: boolean("viewed").default(false),
});

// Quote request submissions
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  pincode: text("pincode"),
  interested: text("interested").notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  viewed: boolean("viewed").default(false),
});

// Calculator results saved by users
export const calculatorResults = pgTable("calculator_results", {
  id: serial("id").primaryKey(),
  monthlyBill: numeric("monthly_bill", { precision: 10, scale: 2 }).notNull(),
  location: text("location").notNull(),
  systemSize: numeric("system_size", { precision: 5, scale: 2 }).notNull(),
  systemCost: numeric("system_cost", { precision: 12, scale: 2 }).notNull(),
  monthlySavings: numeric("monthly_savings", { precision: 10, scale: 2 }).notNull(),
  annualSavings: numeric("annual_savings", { precision: 10, scale: 2 }).notNull(),
  roiPeriod: numeric("roi_period", { precision: 4, scale: 1 }).notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Government subsidies information
export const subsidies = pgTable("subsidies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eligibility: text("eligibility").notNull(),
  amount: text("amount").notNull(),
  applicationProcess: text("application_process").notNull(),
  documentationRequired: text("documentation_required").notNull(),
  region: text("region").notNull(),  // State, region, or "National"
  active: boolean("active").default(true),
  expiryDate: timestamp("expiry_date"),
  source: text("source").notNull(),  // Source of information like government website
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Settings table for site configuration
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relationships
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.category],
    references: [categories.name],
  }),
  installations: many(installations),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const usersRelations = relations(users, ({ many }) => ({
  installations: many(installations),
}));

export const installationsRelations = relations(installations, ({ one }) => ({
  user: one(users, {
    fields: [installations.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [installations.productId],
    references: [products.id],
  }),
}));

// Define insertion schemas with validation
export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.min(3, "Username must be at least 3 characters"),
  password: (schema) => schema.min(6, "Password must be at least 6 characters"),
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Must provide a valid email"),
  role: (schema) => schema.refine(val => ['admin', 'client'].includes(val), {
    message: "Role must be either 'admin' or 'client'"
  }),
});

export const insertInstallationSchema = createInsertSchema(installations, {
  location: (schema) => schema.min(3, "Location must be at least 3 characters"),
  status: (schema) => schema.refine(val => ['pending', 'in-progress', 'completed'].includes(val), {
    message: "Status must be 'pending', 'in-progress', or 'completed'"
  }),
});

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.min(3, "Product name must be at least 3 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.refine((val) => Number(val) > 0, { message: "Price must be positive" }),
});

export const insertCategorySchema = createInsertSchema(categories, {
  name: (schema) => schema.min(2, "Category name must be at least 2 characters"),
  slug: (schema) => schema.min(2, "Slug must be at least 2 characters"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  content: (schema) => schema.min(10, "Content must be at least 10 characters"),
  rating: (schema) => schema.min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Must provide a valid email"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests, {
  firstName: (schema) => schema.min(2, "First name must be at least 2 characters"),
  lastName: (schema) => schema.min(2, "Last name must be at least 2 characters"),
  email: (schema) => schema.email("Must provide a valid email"),
  phone: (schema) => schema.min(10, "Phone number must be at least 10 characters"),
});

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults, {
  monthlyBill: (schema) => schema.refine((val) => Number(val) > 0, { message: "Monthly bill must be positive" }),
  location: (schema) => schema.min(2, "Location must be at least 2 characters"),
  systemSize: (schema) => schema.refine((val) => Number(val) > 0, { message: "System size must be positive" }),
  systemCost: (schema) => schema.refine((val) => Number(val) > 0, { message: "System cost must be positive" }),
  monthlySavings: (schema) => schema.refine((val) => Number(val) > 0, { message: "Monthly savings must be positive" }),
  annualSavings: (schema) => schema.refine((val) => Number(val) > 0, { message: "Annual savings must be positive" }),
  roiPeriod: (schema) => schema.refine((val) => Number(val) > 0, { message: "ROI period must be positive" }),
});

export const insertSubsidySchema = createInsertSchema(subsidies, {
  title: (schema) => schema.min(5, "Title must be at least 5 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  eligibility: (schema) => schema.min(10, "Eligibility must be at least 10 characters"),
  amount: (schema) => schema.min(2, "Amount must be at least 2 characters"),
  applicationProcess: (schema) => schema.min(10, "Application process must be at least 10 characters"),
  documentationRequired: (schema) => schema.min(10, "Documentation requirements must be at least 10 characters"),
  region: (schema) => schema.min(2, "Region must be at least 2 characters"),
  source: (schema) => schema.min(5, "Source must be at least 5 characters"),
});

export const insertSettingSchema = createInsertSchema(settings, {
  key: (schema) => schema.min(2, "Key must be at least 2 characters"),
  value: (schema) => schema.min(1, "Value cannot be empty"),
});

// Define types for use in the application
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type Setting = typeof settings.$inferSelect;
export type Installation = typeof installations.$inferSelect;
export type Subsidy = typeof subsidies.$inferSelect;

// Define insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type InsertInstallation = z.infer<typeof insertInstallationSchema>;
export type InsertSubsidy = z.infer<typeof insertSubsidySchema>;

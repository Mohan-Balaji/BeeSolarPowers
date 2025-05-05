import { db } from "@db";
import * as schema from "@shared/schema";
import { eq, desc, like } from "drizzle-orm";
import { 
  InsertContactSubmission, 
  InsertQuoteRequest, 
  InsertCalculatorResult,
  InsertProduct,
  InsertCategory,
  InsertTestimonial,
  InsertUser,
  InsertInstallation,
  InsertSubsidy
} from "@shared/schema";

export const storage = {
  // Products
  async getAllProducts() {
    return db.select().from(schema.products).orderBy(desc(schema.products.createdAt));
  },

  async getProductsByCategory(categoryName: string) {
    if (categoryName === "all" || !categoryName) {
      return this.getAllProducts();
    }
    return db.select().from(schema.products).where(eq(schema.products.category, categoryName));
  },

  async getFeaturedProducts() {
    return db.select().from(schema.products).where(eq(schema.products.featured, true));
  },

  async getProductById(id: number) {
    const results = await db.select().from(schema.products).where(eq(schema.products.id, id));
    return results.length > 0 ? results[0] : null;
  },

  async insertProduct(product: InsertProduct) {
    const [insertedProduct] = await db.insert(schema.products).values(product).returning();
    return insertedProduct;
  },

  // Categories
  async getAllCategories() {
    return db.select().from(schema.categories).orderBy(schema.categories.name);
  },

  async getCategoryBySlug(slug: string) {
    const results = await db.select().from(schema.categories).where(eq(schema.categories.slug, slug));
    return results.length > 0 ? results[0] : null;
  },

  async insertCategory(category: InsertCategory) {
    const [insertedCategory] = await db.insert(schema.categories).values(category).returning();
    return insertedCategory;
  },

  // Testimonials
  async getAllTestimonials() {
    return db.select().from(schema.testimonials).orderBy(desc(schema.testimonials.createdAt));
  },

  async insertTestimonial(testimonial: InsertTestimonial) {
    const [insertedTestimonial] = await db.insert(schema.testimonials).values(testimonial).returning();
    return insertedTestimonial;
  },

  // Contact form submissions
  async submitContactForm(submission: InsertContactSubmission) {
    const [insertedSubmission] = await db.insert(schema.contactSubmissions).values(submission).returning();
    return insertedSubmission;
  },

  async getContactSubmissions() {
    return db.select().from(schema.contactSubmissions).orderBy(desc(schema.contactSubmissions.createdAt));
  },

  // Quote requests
  async submitQuoteRequest(request: InsertQuoteRequest) {
    const [insertedRequest] = await db.insert(schema.quoteRequests).values(request).returning();
    return insertedRequest;
  },

  async getQuoteRequests() {
    return db.select().from(schema.quoteRequests).orderBy(desc(schema.quoteRequests.createdAt));
  },

  // Calculator results
  async saveCalculatorResult(result: InsertCalculatorResult) {
    const [insertedResult] = await db.insert(schema.calculatorResults).values(result).returning();
    return insertedResult;
  },

  async getCalculatorResults() {
    return db.select().from(schema.calculatorResults).orderBy(desc(schema.calculatorResults.createdAt));
  },

  // Settings
  async getAllSettings() {
    return db.select().from(schema.settings);
  },

  async getSettingByKey(key: string) {
    const results = await db.select().from(schema.settings).where(eq(schema.settings.key, key));
    return results.length > 0 ? results[0].value : null;
  },

  async getMultipleSettingsByKeyPrefix(prefix: string) {
    return db.select().from(schema.settings).where(like(schema.settings.key, `${prefix}%`));
  },

  // User Management
  async createUser(user: InsertUser) {
    const [insertedUser] = await db.insert(schema.users).values(user).returning();
    return insertedUser;
  },

  async getUser(id: number) {
    const results = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return results.length > 0 ? results[0] : null;
  },

  async getUserByUsername(username: string) {
    const results = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return results.length > 0 ? results[0] : null;
  },

  async getAllUsers() {
    return db.select().from(schema.users).orderBy(desc(schema.users.createdAt));
  },

  // Installations
  async createInstallation(installation: InsertInstallation) {
    const [insertedInstallation] = await db.insert(schema.installations).values(installation).returning();
    return insertedInstallation;
  },

  async getInstallationsForUser(userId: number) {
    return db.select().from(schema.installations).where(eq(schema.installations.userId, userId)).orderBy(desc(schema.installations.createdAt));
  },

  async getInstallationById(id: number) {
    const results = await db.select().from(schema.installations).where(eq(schema.installations.id, id));
    return results.length > 0 ? results[0] : null;
  },

  async updateInstallationStatus(id: number, status: string) {
    const [updatedInstallation] = await db
      .update(schema.installations)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(schema.installations.id, id))
      .returning();
    return updatedInstallation;
  },

  // Government Subsidies
  async createSubsidy(subsidy: InsertSubsidy) {
    const [insertedSubsidy] = await db.insert(schema.subsidies).values(subsidy).returning();
    return insertedSubsidy;
  },

  async getAllSubsidies() {
    return db.select()
      .from(schema.subsidies)
      .where(eq(schema.subsidies.active, true))
      .orderBy(schema.subsidies.region);
  },

  async getSubsidyById(id: number) {
    const results = await db.select().from(schema.subsidies).where(eq(schema.subsidies.id, id));
    return results.length > 0 ? results[0] : null;
  },

  async getSubsidiesByRegion(region: string) {
    return db.select()
      .from(schema.subsidies)
      .where(
        eq(schema.subsidies.region, region) &&
        eq(schema.subsidies.active, true)
      );
  }
};

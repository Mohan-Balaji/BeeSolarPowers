import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertQuoteRequestSchema, 
  insertCalculatorResultSchema,
  insertInstallationSchema,
  insertSubsidySchema,
  installations,
  users,
  products
} from "@shared/schema";
import { setupAuth, isAuthenticated, isAdmin } from "./auth";
import { z } from "zod";
import { db } from "../db";
import { eq, and } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication (async)
  await setupAuth(app);
  
  // API route prefix
  const apiPrefix = "/api";

  // Get all products
  app.get(`${apiPrefix}/products`, async (req, res) => {
    try {
      const category = req.query.category as string;
      let products;
      
      if (category && category !== 'all') {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }
      
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get featured products
  app.get(`${apiPrefix}/products/featured`, async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Get single product by ID
  app.get(`${apiPrefix}/products/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get all categories
  app.get(`${apiPrefix}/categories`, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      return res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get all testimonials
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Submit contact form
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.submitContactForm(validatedData);
      return res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully", 
        id: submission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Submit quote request
  app.post(`${apiPrefix}/quote`, async (req, res) => {
    try {
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      const request = await storage.submitQuoteRequest(validatedData);
      return res.status(201).json({ 
        success: true, 
        message: "Quote request submitted successfully", 
        id: request.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error submitting quote request:", error);
      return res.status(500).json({ error: "Failed to submit quote request" });
    }
  });

  // Save calculator result
  app.post(`${apiPrefix}/calculator`, async (req, res) => {
    try {
      const validatedData = insertCalculatorResultSchema.parse(req.body);
      const result = await storage.saveCalculatorResult(validatedData);
      return res.status(201).json({ 
        success: true, 
        message: "Calculator result saved successfully", 
        id: result.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error saving calculator result:", error);
      return res.status(500).json({ error: "Failed to save calculator result" });
    }
  });

  // Get settings
  app.get(`${apiPrefix}/settings`, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      
      // Convert to key-value object for easier consumption on frontend
      const settingsObject: Record<string, string> = {};
      settings.forEach(setting => {
        settingsObject[setting.key] = setting.value;
      });
      
      return res.json(settingsObject);
    } catch (error) {
      console.error("Error fetching settings:", error);
      return res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  // Get settings by prefix
  app.get(`${apiPrefix}/settings/:prefix`, async (req, res) => {
    try {
      const prefix = req.params.prefix;
      const settings = await storage.getMultipleSettingsByKeyPrefix(prefix);
      
      // Convert to key-value object for easier consumption on frontend
      const settingsObject: Record<string, string> = {};
      settings.forEach(setting => {
        settingsObject[setting.key] = setting.value;
      });
      
      return res.json(settingsObject);
    } catch (error) {
      console.error("Error fetching settings by prefix:", error);
      return res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  // INSTALLATION TRACKING ROUTES

  // Get installations for specific user
  app.get(`${apiPrefix}/installations/user/:userId`, isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      // Users can only view their own installations unless they are admin
      if (req.user && (req.user.id !== userId && req.user.role !== "admin")) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      const userInstallations = await db.query.installations.findMany({
        where: eq(installations.userId, userId),
        with: {
          product: true,
        },
      });
      
      return res.json(userInstallations);
    } catch (error) {
      console.error("Error fetching user installations:", error);
      return res.status(500).json({ error: "Failed to fetch installations" });
    }
  });

  // Admin routes for installation management
  
  // Get all installations (admin only)
  app.get(`${apiPrefix}/admin/installations`, isAdmin, async (req, res) => {
    try {
      const allInstallations = await db.query.installations.findMany({
        with: {
          product: true,
          user: true,
        },
      });
      
      return res.json(allInstallations);
    } catch (error) {
      console.error("Error fetching all installations:", error);
      return res.status(500).json({ error: "Failed to fetch installations" });
    }
  });

  // Update installation status (admin only)
  app.patch(`${apiPrefix}/admin/installations/:id`, isAdmin, async (req, res) => {
    try {
      const installationId = parseInt(req.params.id);
      if (isNaN(installationId)) {
        return res.status(400).json({ error: "Invalid installation ID" });
      }
      
      const { status, notes, installationDate, completionDate } = req.body;
      
      // Check if installation exists
      const existingInstallation = await db.query.installations.findFirst({
        where: eq(installations.id, installationId),
      });
      
      if (!existingInstallation) {
        return res.status(404).json({ error: "Installation not found" });
      }
      
      // Update installation
      const [updatedInstallation] = await db
        .update(installations)
        .set({
          status: status || existingInstallation.status,
          notes: notes !== undefined ? notes : existingInstallation.notes,
          installationDate: installationDate ? new Date(installationDate) : existingInstallation.installationDate,
          completionDate: completionDate ? new Date(completionDate) : existingInstallation.completionDate,
          updatedAt: new Date(),
        })
        .where(eq(installations.id, installationId))
        .returning();
      
      return res.json(updatedInstallation);
    } catch (error) {
      console.error("Error updating installation:", error);
      return res.status(500).json({ error: "Failed to update installation" });
    }
  });

  // Create new installation (admin only)
  app.post(`${apiPrefix}/admin/installations`, isAdmin, async (req, res) => {
    try {
      const validatedData = insertInstallationSchema.parse(req.body);
      
      // Create new installation
      const installation = await storage.createInstallation(validatedData);
      
      return res.status(201).json(installation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating installation:", error);
      return res.status(500).json({ error: "Failed to create installation" });
    }
  });

  // Get all users (admin only)
  app.get(`${apiPrefix}/admin/users`, isAdmin, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      return res.json(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

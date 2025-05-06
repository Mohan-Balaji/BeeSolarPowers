# Architecture Overview

## 1. Overview

This repository contains a full-stack web application for BEE SOLAR POWERS, an authorized distributor of Loom Solar products. The application serves as both a customer-facing website for showcasing solar products and services, and a management portal for tracking solar installations and managing clients.

The application follows a modern web architecture with a clear separation between client and server components:

- **Frontend**: React-based single-page application (SPA) with TailwindCSS for styling
- **Backend**: Express.js server with a RESTful API
- **Database**: PostgreSQL database accessed via Drizzle ORM

## 2. System Architecture

The system follows a client-server architecture with the following high-level components:

```
┌─────────────┐          ┌────────────┐          ┌────────────┐
│             │          │            │          │            │
│  React SPA  │◄────────►│  Express   │◄────────►│ PostgreSQL │
│  (Client)   │  HTTP/   │  Server    │  SQL     │ Database   │
│             │  JSON    │            │          │            │
└─────────────┘          └────────────┘          └────────────┘
```

### Key Architectural Decisions

1. **Monorepo Structure**: The application is organized as a monorepo with client, server, and shared code in a single repository. This facilitates code sharing and simplifies deployment.

2. **Shared Schema**: The database schema is defined in a shared directory (`/shared/schema.ts`) using Drizzle ORM, allowing both client and server to use the same data types and validation schemas.

3. **Server-Side Rendering**: The application uses server-side routing with a client-side React application, allowing for better SEO while maintaining the interactivity of a SPA.

4. **TypeScript**: The entire application is written in TypeScript, providing strong typing and better developer experience.

5. **API-First Design**: The backend exposes a RESTful API that the frontend consumes, enabling potential future mobile applications or third-party integrations.

## 3. Key Components

### 3.1 Frontend (Client)

The frontend is built with React and organized into the following structure:

- `/client/src/pages`: Page components for different routes
- `/client/src/components`: Reusable UI components
- `/client/src/hooks`: Custom React hooks for shared functionality
- `/client/src/lib`: Utility functions and shared logic

#### UI Framework

The application uses a component library based on [shadcn/ui](https://ui.shadcn.com/) with TailwindCSS for styling. This provides:
- A consistent visual design system
- Accessible UI components
- Responsive layouts

#### State Management

- **React Query**: Used for data fetching, caching, and state management for server data
- **React Context**: Used for client-side state like authentication status

### 3.2 Backend (Server)

The backend is built with Express.js and organized into the following structure:

- `/server/index.ts`: Main entry point and server setup
- `/server/routes.ts`: API route definitions
- `/server/auth.ts`: Authentication logic
- `/server/storage.ts`: Database operations abstraction

#### API Routes

The API follows RESTful principles with the following main endpoints:

- `/api/products`: Product management
- `/api/categories`: Category management
- `/api/users`: User management
- `/api/installations`: Installation tracking
- `/api/contact`: Contact form submission
- `/api/login`, `/api/logout`: Authentication

### 3.3 Database Layer

The application uses PostgreSQL with Drizzle ORM for database operations. The schema includes:

- `users`: Customer and admin user accounts
- `products`: Solar products catalog
- `categories`: Product categories
- `installations`: Solar installation tracking

The database connection is handled through `@neondatabase/serverless`, indicating the use of Neon PostgreSQL (a serverless Postgres provider).

### 3.4 Shared Code

- `/shared/schema.ts`: Database schema definitions shared between client and server
- Types and interfaces for data models

## 4. Data Flow

### 4.1 Authentication Flow

1. User submits login credentials
2. Server validates credentials and creates a session
3. Session cookie is stored in the browser
4. Authenticated requests include the session cookie
5. Server validates the session for protected routes

### 4.2 Product Catalog Flow

1. Client requests products from `/api/products`
2. Server queries the database for products
3. Data is returned as JSON to the client
4. React Query caches the data on the client
5. UI components render the product data

### 4.3 Installation Tracking Flow

1. Admin creates a new installation record
2. Client submits installation data to `/api/installations`
3. Server validates and stores the installation
4. Customers can view their installation status
5. Admins can update installation progress

## 5. External Dependencies

### 5.1 Frontend Dependencies

- **React**: UI library
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **React Query**: Data fetching and state management
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation

### 5.2 Backend Dependencies

- **Express**: Web server framework
- **Passport**: Authentication middleware
- **Drizzle ORM**: Database ORM
- **Neon Database SDK**: Serverless PostgreSQL client

### 5.3 Development Tools

- **TypeScript**: Static typing
- **Vite**: Build tool and development server
- **ESBuild**: JavaScript bundler
- **Drizzle Kit**: Database migration tools

## 6. Deployment Strategy

The application is configured for deployment on Replit, with specific settings in the `.replit` file:

```
deploymentTarget = "autoscale"
run = ["npm", "run", "start"]
build = ["npm", "run", "build"]
```

The build process:
1. Frontend assets are built with Vite
2. Server code is bundled with ESBuild
3. Both are output to the `dist` directory

The deployment environment requires:
1. Node.js 20
2. PostgreSQL 16
3. Environment variables for database connection

The application can be scaled horizontally as it follows stateless design principles with database-backed sessions.

## 7. Security Considerations

### 7.1 Authentication and Authorization

- Password hashing is implemented using scrypt with salt
- Session-based authentication with secure HTTP-only cookies
- Role-based access control (admin vs client users)

### 7.2 Data Validation

- Input validation using Zod schemas
- API request validation before processing
- Database query parameterization to prevent SQL injection

### 7.3 Frontend Security

- CSRF protection through proper authentication token handling
- Content Security Policy considerations
- Secure cookie usage

## 8. Future Considerations

### 8.1 Potential Improvements

- Implement WebSocket for real-time installation status updates
- Add a content management system for dynamic content
- Improve mobile experience with responsive design optimizations
- Implement additional payment integrations for online purchases

### 8.2 Scalability Considerations

- Implement caching strategies for frequently accessed data
- Optimize database queries with proper indexing
- Consider CDN integration for static assets
- Explore serverless functions for specific API endpoints
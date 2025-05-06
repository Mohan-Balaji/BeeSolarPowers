// This file serves as the API entry point for Vercel
import { createServer } from 'http';
import express from 'express';
import session from 'express-session';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import connectPgSimple from 'connect-pg-simple';

// Import schema
import * as schema from '../shared/schema.js';

// Create Express app
const app = express();
app.use(express.json());

// Database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

// Session setup
const PgSession = connectPgSimple(session);
const sessionStore = new PgSession({
  pool,
  tableName: 'session'
});

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

const scryptAsync = promisify(scrypt);

async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split('.');
  const hashedBuf = Buffer.from(hashed, 'hex');
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const users = await db.select().from(schema.users).where(schema.users.username, username);
      const user = users.length > 0 ? users[0] : null;
      
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const users = await db.select().from(schema.users).where(schema.users.id, id);
    const user = users.length > 0 ? users[0] : null;
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// API Routes
app.get('/api/user', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  res.json(req.user);
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.json(user);
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout(() => {
    res.sendStatus(200);
  });
});

// Add all your API routes here...

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Create server
const server = createServer(app);
export default app;
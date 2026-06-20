import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Routers
import problemsRouter from './api/problems.js';
import projectsRouter from './api/projects.js';
import submissionsRouter from './api/submissions.js';
import dashboardRouter from './api/dashboard.js';
import leaderboardRouter from './api/leaderboard.js';
import contestsRouter from './api/contests.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite development server
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id']
}));

app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Register API Routes
app.use('/api/problems', problemsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/contests', contestsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Favicon handler
app.get('/favicon.ico', (req, res) => {
  // Return a simple SVG favicon
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>';
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// Serve frontend assets in production (optional fallback)
const frontendBuildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendBuildPath));

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Geonixa Compiler Server running on port ${PORT}`);
    console.log(`👉 Mode: ${process.env.USE_LOCAL_COMPILER === 'true' ? 'Local Sandbox Compiler' : 'Judge0 Engine API'}`);
    console.log(`===============================================`);
  });
}

// Export for Vercel
export default app;

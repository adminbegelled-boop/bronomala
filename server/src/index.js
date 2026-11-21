const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from root .env or server .env
const rootEnvPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
} else {
  dotenv.config();
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { seedInitialAdmin } = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes');
const participantRoutes = require('./routes/participantRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB().then(() => {
  seedInitialAdmin();
});

// Middleware
app.use(cors({
  origin: '*', // Allow Next.js dev server or any deployed frontend
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Firewell Registration API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api', participantRoutes);

// Static Client Serving (Production / Render deployment)
const clientBuildPath = path.resolve(__dirname, '../../client/out');

if (fs.existsSync(clientBuildPath)) {
  console.log(`[Static] Serving frontend static assets from: ${clientBuildPath}`);
  app.use(express.static(clientBuildPath, { extensions: ['html'] }));

  // Fallback for sub-routes or SPA pages
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }

    // Try finding exact file first
    const sanitizedPath = req.path.replace(/\/$/, '');
    const directHtml = path.join(clientBuildPath, `${sanitizedPath}.html`);
    const subIndexHtml = path.join(clientBuildPath, sanitizedPath, 'index.html');

    if (fs.existsSync(directHtml)) {
      return res.sendFile(directHtml);
    }
    if (fs.existsSync(subIndexHtml)) {
      return res.sendFile(subIndexHtml);
    }

    return res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  console.log('[Static] Client build directory not found. Express running in API-only mode.');
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ success: false, message: 'API route not found' });
    }
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Firewell Registration API</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0f1d; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #0f172a; padding: 2.5rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.1); max-width: 500px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
            h1 { color: #f97316; margin-bottom: 0.5rem; }
            p { color: #94a3b8; line-height: 1.6; }
            .badge { display: inline-block; padding: 0.25rem 0.75rem; background: rgba(249, 115, 22, 0.15); color: #fb923c; border-radius: 9999px; font-weight: 600; font-size: 0.875rem; margin-bottom: 1rem; }
            a { color: #38bdf8; text-decoration: none; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Backend Active</div>
            <h1>🔥 Firewell Server Running</h1>
            <p>API endpoints are active at <code>/api</code>. Run <code>npm run build</code> in the root folder to compile the Next.js frontend into static production files.</p>
            <p><a href="/api/health" target="_blank">Check Server Health</a></p>
          </div>
        </body>
      </html>
    `);
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ServerError]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🔥 FIREWELL REGISTRATION SYSTEM IS LIVE!`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`🔑 Default Admin: ${process.env.ADMIN_EMAIL || 'admin@firewell.com'} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
  console.log(`====================================================`);
});

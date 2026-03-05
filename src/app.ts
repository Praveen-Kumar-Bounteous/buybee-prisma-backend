import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/index.js';

const app = express();

app.use(cors({
    // allowing both local and deployed frontend
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://buybee-rouge.vercel.app"
    ],
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging (Corporate standard for monitoring)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// --- Entry Point & Health Checks ---

// 1. Root Entry Point Check "/"
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to BuyBee API",
        version: "1.0.0",
        documentation: "/api/v1"
    });
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.redirect(
    302,
    "https://github.com/Praveen-Kumar-Bounteous/buybee-prisma-backend/blob/6d693b70dfabcb81eb59ddeca8e7d2770b2426e2/README.md"
  );
});

// 2. Health Check "/health" (For Load Balancers/Docker)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: "UP",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// --- API Routes ---
app.use('/api/v1', router);

// --- Global Error Handlers ---

// 3. 404 Route Check (Handle unknown endpoints)
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// 4. Centralized Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    
    console.error(`[Error] ${req.method} ${req.url}: ${message}`);

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

export default app;
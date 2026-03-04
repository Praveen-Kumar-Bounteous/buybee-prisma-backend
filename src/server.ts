import dotenv from 'dotenv';
import app from './app.js';
import { prisma } from './lib/prisma.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Start the application server
 */
const startServer = async () => {
    try {
        // Test Database Connection before starting Express
        console.log("Connecting to PostgreSQL via Prisma...");
        await prisma.$connect();
        console.log("✅ Database Connection: Established.");

        const server = app.listen(PORT, () => {
            console.log(`🚀 BuyBee Backend: Running on port ${PORT}`);
            console.log(`🔗 Local Link: http://localhost:${PORT}`);
        });

        // Handle Unhandled Rejections (e.g. broken promises elsewhere in app)
        process.on('unhandledRejection', (err: any) => {
            console.error(`❌ Unhandled Rejection: ${err.message}`);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error("❌ Startup Error:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

// Graceful Shutdown: Clean up DB connection on process kill
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log("\n Prisma Disconnected. Closing Server.");
    process.exit(0);
});

startServer();
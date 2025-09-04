import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// Enable CORS with proper configuration
app.use(cors({
  origin: "https://github-timeline-notifier1.vercel.app",
  methods: ["GET", "POST", "OPTIONS"], // ✅ Add OPTIONS method
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight requests explicitly
app.options("*", cors()); // ✅ This handles all OPTIONS requests

app.use(express.json());

// Routes
app.use("/api", subscriberRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
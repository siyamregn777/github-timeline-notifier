import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// ✅ Enhanced CORS configuration
const corsOptions = {
  origin: [
    "https://github-timeline-notifier1.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ✅ Handle OPTIONS preflight requests for specific routes
app.options("/api/signup", cors(corsOptions));
app.options("/api/update", cors(corsOptions));
// Add other API routes as needed

app.use(express.json());

// Routes
app.use("/api", subscriberRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
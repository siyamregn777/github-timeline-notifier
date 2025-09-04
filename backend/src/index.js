// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// ✅ Configure CORS
app.use(cors({
  origin: "https://github-timeline-notifier1.vercel.app/", // allow local + deployed frontend
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", subscriberRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

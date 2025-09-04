// routes/subscriberRoutes.js
import express from "express";
import { addSubscriber, sendUpdates } from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/signup", addSubscriber);  // capture → store
router.get("/update", sendUpdates);     // fetch → send

export default router;

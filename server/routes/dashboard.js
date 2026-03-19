import express from "express";
import { progress } from "../controllers/dashboard.controller.js";

const router = express.Router();
router.get("/progress", progress);
export default router;

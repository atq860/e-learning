import express from "express";
const router = express.Router();
import {
  createProblem,
  getProblems,
} from "../controllers/supportController.js";
import { admin, protect, user, expert } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect,createProblem)
  .get(protect, admin, getProblems);
export default router;

import express from "express";
const router = express.Router();
import {
  createQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/questionController.js";
import { admin, protect, user, expert } from "../middleware/authMiddleware.js";

router.route("/").post(protect, user, createQuestion);
router.route("/:id/answers").post(protect, expert, createAnswer);
router
  .route("/:id/answers/:answerId")
  .put(protect, expert, updateAnswer)
  .delete(protect, expert, deleteAnswer);
export default router;

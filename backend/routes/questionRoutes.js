import express from "express";
const router = express.Router();
import {
  createQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  closeQuestionDiscussion,
} from "../controllers/questionController.js";
import { admin, protect, user, expert } from "../middleware/authMiddleware.js";

router.route("/").post(protect, user, createQuestion).get(getQuestions);
router.route("/:id/close").put(protect, user, closeQuestionDiscussion);
router
  .route("/:id")
  .get(getQuestionById)
  .put(protect, user, updateQuestion)
  .delete(protect, user, deleteQuestion);
router.route("/:id/answers").post(protect, createAnswer);
router
  .route("/:id/answers/:answerId")
  .put(protect, expert, updateAnswer)
  .delete(protect, expert, deleteAnswer);
export default router;

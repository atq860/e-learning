import express from "express";
const router = express.Router();
import {
  unapprovedExperts,
  authUser,
  registerUser,
  updateExpertToApproved,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  // getConsultants,
  // registerConsultant,
  // createConsultantReview,
} from "../controllers/userController.js";
import { admin, protect, user } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.get("/unapprove", protect, admin, unapprovedExperts);
router.put("/approve/:id", protect, admin, updateExpertToApproved);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, admin, updateUser);

// router.route("/consultants").get(getConsultants);
// router.route("/:id/reviews").post(protect, user, createConsultantReview);

// router.route("/registerConsultant").post(registerConsultant);

export default router;

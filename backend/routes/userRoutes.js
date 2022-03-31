import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  // getUserProfile,
  // updateUserProfile,
  // getUsers,
  // deleteUser,
  // getUserById,
  // updateUser,
  // getConsultants,
  // registerConsultant,
  // createConsultantReview,
} from "../controllers/userController.js";
// import { admin, protect, user } from "../middleware/authMiddleware.js";

// router.route("/consultants").get(getConsultants);
// router.route("/:id/reviews").post(protect, user, createConsultantReview);

// router.route("/registerConsultant").post(registerConsultant);
router.route("/").post(registerUser)/* .get(protect, admin, getUsers); */
router.post("/login", authUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router
//   .route("/:id")
//   .delete(protect, admin, deleteUser)
//   .get(protect, getUserById)
//   .put(protect, admin, updateUser);

export default router;
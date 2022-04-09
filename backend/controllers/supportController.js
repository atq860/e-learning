import Support from "../models/supportModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create New Support
// @route   POST /api/support
// access   Private/user,expert
const createProblem = asyncHandler(async (req, res) => {
  const { title, problem } = req.body;

  const support = new Support({
    user: req.user._id,
    title,
    problem,
  });

  const createdSupport = await support.save();
  res.status(201).json(createdSupport);
});

// @desc    GET all users
// @route   GET /api/users
// access   Private/Admin
const getProblems = asyncHandler(async (req, res) => {
  const supports = await Support.find({}).populate("user", "name type email ");
  res.json(supports);
});

export { createProblem, getProblems };

import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { userType } from "../constants/userType.js";

// @desc    Auth User & Get Token
// @route   POST /api/users/login
// access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.isApproved) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        isApproved: user.isApproved,
        image: user.image,
        token: generateToken(user._id),
      });
    } else {
      res.status(401); /* .json({
      message: "User is not approved yet"
    }) */
      throw new Error("User is not approved yet");
    }
  } else {
    res.status(401); // 401 is unauthorized
    throw new Error("Invalid Email Or Password");
  }
});

// @desc    Register a new User
// @route   POST /api/users
// access   Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    country,
    city,
    image,
    isApproved,
    type,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    type,
    phone,
    country,
    city,
    image,
    isApproved,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      isApproved: user.isApproved,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    GET User Profile
// @route   GET /api/users/profile
// access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Current Logged in User

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    UPDATE User Profile
// @route   PUT /api/users/profile
// access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // Current Logged in User

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.country = req.body.country || user.country;
    user.city = req.body.city || user.city;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// _________________ ADMIN ___________________

// @desc    Approve Experts
// @route   GET /api/users/unapprove
// access   Private/Admin
const unapprovedExperts = asyncHandler(async (req, res) => {
  const user = await User.find({ type: userType.EXPERT });
  const notApprovedExperts = user.filter((user) => !user.isApproved);

  res.json(notApprovedExperts);
});

// @desc    Approve Experts
// @route   PUT /api/users/approve/:id
// access   Private/Admin
const updateExpertToApproved = asyncHandler(async (req, res) => {
  const expert = await User.findById(req.params.id);

  if (expert) {
    expert.isApproved = true;

    const approvedExpert = await expert.save();
    res.json(approvedExpert);
  } else {
    res.status(404);
    throw new Error("Expert Not Found");
  }
});

// @desc    GET all users
// @route   GET /api/users
// access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); // Current Logged in User
  res.json(users);
});

// @desc    DELETE User
// @route   DELETE /api/users/:id
// access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Current Logged in User

  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    GET user By ID
// @route   GET /api/users/:id
// access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    UPDATE User
// @route   PUT /api/users/:id
// access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // get User By Id From Admin

  if (user) {
    user.name = req.body.name || user.name;
    // user.email = req.body.email || user.email;
    // user.type = req.body.type || user.type;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      // email: updatedUser.email,
      // type: updatedUser.type,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  unapprovedExperts,
  updateExpertToApproved,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile,
  getUserProfile,
};

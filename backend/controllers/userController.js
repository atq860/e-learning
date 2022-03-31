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
    phone: "0",
    country: "Sample",
    city: "Sample",
    image: "/images/sample.jpg",
    isApproved,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
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
// Firsr thing is get data from BODY
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
// First thing is, get data from BODY
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
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    GET all users
// @route   GET /api/users
// access   Private/Admin
// Firsr thing is get data from BODY
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
  // One Big Change, we dont want logged in User, but we want it from ID
  // So previously const user = await User.findById(req.user._id); // Current Logged in User
  // and Now Below

  const user = await User.findById(req.params.id); // get User By Id From Admin

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.type = req.body.type || user.type;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// ________________ Consultant _________________
// @desc    Register a new Seller
// @route   POST /api/users/registerConsultant
// @access  Public
const registerConsultant = asyncHandler(async (req, res) => {
  const { name, password, phone, cnic, country, city, town, image } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    image,
    password,
    phone,
    cnic,
    country: country.toLowerCase(),
    city: city.toLowerCase(),
    town: town.toLowerCase(),
    type: userType.CONSULTANT,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      phone: user.phone,
      cnic: user.cnic,
      country: user.country,
      city: user.city,
      town: user.town,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    GET all Consultants
// @route   GET /api/consultants
// access   Public
const getConsultants = asyncHandler(async (req, res) => {
  const users = await User.find({});

  const consultants = users.filter((user) => user.type === userType.CONSULTANT);

  res.json(consultants);
});

// @desc    Create new review
// @route   POST /api/users/:id/reviews
// @access  Private/buyer
const createConsultantReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const seller = await User.findById(req.params.id);

  if (seller) {
    const alreadyReviewed = seller.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    seller.reviews.push(review);

    seller.numReviews = seller.reviews.length;

    seller.rating =
      seller.reviews.reduce((acc, item) => item.rating + acc, 0) /
      seller.reviews.length;

    await seller.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
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
};

// const { email, password } = req.body;
//   res.send({ email, password });

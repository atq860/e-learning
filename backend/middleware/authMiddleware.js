import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { userType } from "../constants/userType.js";

// this is middleware, so passing next
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //fetching User
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.type === userType.ADMIN) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};

const user = (req, res, next) => {
  if (req.user && req.user.type === userType.USER) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as a User");
  }
};

const expert = (req, res, next) => {
  if (req.user && req.user.type === userType.EXPERT) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Expert");
  }
};

export { protect, admin, user, expert };

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.put("/update-profile", protectRoute, updateUserProfile);

export default router;

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const registerUser = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const userExists = await User.exists({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id, res);

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Signup Controller Error: ", error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalild credentials or User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid credentials or User not found" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      message: "User logged is Successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        displayPicture: user.displayPicture,
      },
    });
  } catch (error) {
    console.log("error in the loginUser Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("error in the logoutUser Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    console.log(req.body)
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findById(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(
      "error in update auth.controller/updateUserProfile: ",
      err.message
    );
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("error in checkAuth controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

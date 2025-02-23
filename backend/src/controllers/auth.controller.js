import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js";

export const registerUser = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
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
      token
    });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const loginUser = (req, res) => {
  // Implement login logic here
  res.send("login route");
};
export const logoutUser = (req, res) => {
  // Implement logout logic here
  res.send("logout route");
};

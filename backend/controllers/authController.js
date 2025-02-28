import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register user
const registerUser = async (req, res) => {
  const { name, email, password, profileImageUrl } = req.body;

  //validation:check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create new user
    const newUser = new User({ name, email, password, profileImageUrl });
    await newUser.save();
    //generate token
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
};
//get user info
const getUserInfo = async (req, res) => {
  const user = req.user;
};

export { registerUser, loginUser, getUserInfo };

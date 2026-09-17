import User from "../models/User.js";
import bcrypt from "bcrypt"

export async function register(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password , 12)

  if (!name || !email || !password) {
    return res.json({ message: "All fields are required to register" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ messsage: "User already exists" });
  }

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.json({ message: "User registered" });
}

export async function login(req, res) {
  const { email, password } = req.body; // 12345
  if (!email || !password) {
    return res.json({ message: "All fields are required" });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.json({ message: "Invalid credentails" });
  }

  const isPasswordValid = await bcrypt.compare(password , user.password ) 

  if(!isPasswordValid){
    return res.json({message : "Invalid password or credentials"})
  }

  res.cookie("uid", user._id, {
    httpOnly: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({ message: "User logged in " });
}

export function logout(req, res) {
  res.clearCookie("uid");

  return res.status(201).json({ message: "User logged out" });
}

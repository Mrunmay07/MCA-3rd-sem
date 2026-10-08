import express from "express";
import {
  login,
  logout,
  logoutAllDevices,
  register,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import OTP from "../models/OTP.js";
import nodemailer from "nodemailer";
import "dotenv/config";
import Session from "../models/Session.js";
import User from "../models/User.js";

const router = express.Router();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// register
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", authMiddleware, logout);

// logout all devices
router.post("/logout-all", authMiddleware, logoutAllDevices);

// OTP generate
router.post("/request-otp", async (req, res) => {
  const { email , password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Email is required for OTP " });
  }

  // 1. Find User
  const user = await User.findOne({email})

  if(!user){
    return res.status(401).json({message : "Invalid credentials"})
  }

  // 2. Verify password
  const isPasswordValid = await bcrypt.compare(password , user.password)

  if(!isPasswordValid){
    return res.status(401).json({message : "Invalid credentials"})
  }

  // 3. Generate OTP
  const otp = crypto.randomInt(1000 , 10000)

  // 4. OTP hash
  const otpHash = await bcrypt.hash(otp.toString() , 12)

  // 5. OTP expires
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  // 6. Delete previous OTP 
  await OTP.deleteMany({ email });

  // 7. store otp
  await OTP.create({
    email,
    otpHash,
    expiresAt,
    attempts : 0,
  });


  // send to email -> nodemailer
  await transporter.sendMail({
    from : process.env.SMTP_USER,
    to: email,
    subject : "Your OTP",
    text : `Your OTP is ${otp} . Valid for 5 mins`,
  });

  return res.json({ message: "OTP sent" });
});

// OTP verify
router.post("/verify-otp" , async (req  ,res) => {
  const {email , otp} = req.body

      if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // Find OTP 
    const storedOTP = await OTP.findOne({email})

    if (!storedOTP) {
      return res.status(400).json({
        message: "OTP not found or expired",
      });
    }

    if(storedOTP.expiresAt < new Date()){
      await OTP.findByIdAndDelete(storedOTP._id)

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // Check attempts
    if(storedOTP.attempts >= 5){
      await OTP.findByIdAndDelete(storedOTP._id)
       return res.status(429).json({
        message: "Too many incorrect attempts",
      });
    }

     // Compare entered OTP with hash
    const isValid = await bcrypt.compare(
      otp.toString(),
      storedOTP.otpHash
    );

    if (!isValid) {

      storedOTP.attempts += 1;
      await storedOTP.save();

      return res.status(401).json({
        message: "Invalid OTP",
      });
    }

    // OTP is valid
    await OTP.findByIdAndDelete(storedOTP._id);

     // Find user
    const user = await User.findOne({ email });


     if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

     // Create session
    const session = await Session.create({
      userId: user._id,
      expiresAt: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),
    });

    // Set cookie
    res.cookie("sid", session._id.toString(), {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
    });

})

export default router;

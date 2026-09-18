import express from "express";
import { login, logout, logoutAllDevices, register } from "../controllers/userController.js";
import Session from "../models/Session.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// logout
router.post("/logout", authMiddleware , logout);

// logout all devices
router.post("/logout-all" , authMiddleware , logoutAllDevices)


export default router;

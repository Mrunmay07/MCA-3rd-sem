import express from "express"
import usersData from "../usersDB.json" with {type : "json"}
import { login, logout, register } from "../controllers/userController.js"


const router = express.Router()

// register 
router.post("/register" , register)

// login
router.post("/login" , login)

// logout
router.post("/logout" ,logout)


export default router
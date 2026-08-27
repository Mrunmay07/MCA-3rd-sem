import express from "express"
import usersData from "../usersDB.json" with {type : "json"}
import crypto from "crypto";
import { writeFile } from "fs/promises";


const router = express.Router()

// register 
router.post("/register" , async (req , res) => {
    const {username , email , password} = req.body

    if(!username || !email || !password){
      return res.json({message : "All fields are required to register"})
    } 

    const newUser = {
      id : crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    usersData.push(newUser)
    
    try {
      await writeFile("./usersDB.json" , JSON.stringify(usersData , null , 2))
      return res.status(201).json({message : "User registered"})
    } catch (err) {
      return res.status(400).json({message : "User failed to register"})
    }

})

// login
router.post("/login" , (req , res) => {
    const {email , password} = req.body
    if(!email || !password){
      return res.json({message : "All fields are required"})
    } 
    const user = usersData.find((user) => {
      return user.email === email && user.password === password 
    })
   
    if(!user){
      return res.json({message : 'Invalid credentails'})
    }

    res.cookie("uid" , user.id)

    return res.json({message : "User logged in "})

})

// logout
router.post("/logout" , (req , res ) => {

  res.clearCookie("uid")

  return res.status(201).json({message : "User logged out"})
})


export default router
import User from "../models/User.js"

 export async function register(req , res){
    const {name , email , password} = req.body

    if(!name || !email || !password){
      return res.json({message : "All fields are required to register"})
    } 

    const existingUser = await User.findOne({email})
    
    if(existingUser){
      return res.json({messsage : "User already exists"})
    }

    await User.create({
      name,
      email,
      password
    })

    return res.json({message : "User registered"})

}

export async function login(req , res){
    const {email , password} = req.body
    if(!email || !password){
      return res.json({message : "All fields are required"})
    } 

    const user = await User.findOne({
      email ,
      password
    })

  
    if(!user){
      return res.json({message : 'Invalid credentails'})
    }

    res.cookie("uid" , user._id)

    return res.json({message : "User logged in "})

}

export function logout (req , res ){

  res.clearCookie("uid")

  return res.status(201).json({message : "User logged out"})
}
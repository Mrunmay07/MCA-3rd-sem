import User from "../models/User.js"

async function authMiddleware(req , res , next){
    const uid = req.cookies.uid

    if(!uid){
        return res.json({message : "Please Login first"})
    }

    const user = await User.findById(uid)

    if(!user){
        return res.json({message : "Session invalid"})
    }
   
    req.user = user

    next()
}

export default authMiddleware
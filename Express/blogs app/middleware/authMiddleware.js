import usersData from "../usersDB.json" with {type:"json"}

function authMiddleware(req , res , next){
    const uid = req.cookies.uid

    if(!uid){
        return res.json({message : "Please Login first"})
    }

    const user = usersData.find((user) => user.id === uid )
   
    req.user = user

    next()
}

export default authMiddleware
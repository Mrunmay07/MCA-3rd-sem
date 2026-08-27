import usersData from "../usersDB.json" with {type:"json"}

function authMiddleware(req , res , next){
    const uid = req.cookies.uid // 1f2e10e6-bad9-4759-a394-3c95d5b86ecf

    if(!uid){
        return res.json({message : "Please Login first"})
    }

    const user = usersData.find((user) => user.id === uid )
    /*
        const user = {
    "id": "2d87d02f-aa6c-419d-95cd-eda66f09fde6",
    "username": "Anshul",
    "email": "anshul@gmail.com",
    "password": 12345,
    "createdAt": "2026-08-27T06:39:22.527Z",
    "updatedAt": "2026-08-27T06:39:22.527Z"
  }
    */
    req.user = user

    next()
}

export default authMiddleware
import bcrypt from "bcrypt"

// register
// username , email , password
const password = "rohit@123"

const storedPassword = await bcrypt.hash(password , 12)
// $2b$12$BhzxeYd3BmE9iXgxd7Rl2OE2rcn84TElf2o92E8kvpHWMOJ.MAq7y

// login 
// email , password
const enteredPassword = "rohit@123"

console.log(await bcrypt.compare(enteredPassword , storedPassword)
)
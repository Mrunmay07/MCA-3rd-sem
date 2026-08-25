import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(express.text())
app.use(cookieParser())

app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin' , "http://127.0.0.1:5500")
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    next()
})


app.get('/', (req, res) => {
   /*  res.setHeader('Set-Cookie' ,'uid=12345;httpOnly;SameSite=None; secure') */

   res.cookie("name" , "akash" , {
    httpOnly : true,
    secure:true,
    sameSite : "none"
   })
   console.log(req.headers.cookie)
   console.log(req.cookies.name)

    res.json({message : "Hello world"})
})

app.listen(7000, () => {
    console.log('Server started at http://localhost:7000')
})
import express from "express"
import cors from "cors"

const app = express()
 app.use((req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin" , '*')
    
    next()
})


app.use(express.json())
app.use(express.text())

app.get('/', (req, res) => {
    return res.json({message : "Hello world"})
})

app.post("/login" , (req , res) => {
    console.log(req.body)    
    return res.json({message:"Logged in"})
})


app.listen(7000, () => {
    console.log('Server started at http://localhost:7000')
})
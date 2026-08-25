import express from "express"
import cors from "cors"

const app = express()

app.use(express.text())

/* app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin' , 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods' , 'PATCH , DELETE')
    next()
}) */
app.use(cors({
    origin:"http://127.0.0.1:5500",
    allowedHeaders:"Content-Type",
    methods : ["PUT" , "DELETE" , "PATCH"]
}))

app.get('/', (req, res) => {
    res.json({message : "Hello world"})
})

app.post('/login' , (req , res) => {
    console.log(req.body)
    res.json({message : "Logged IN"})
})

app.patch("/update" , (req , res) => {
    res.json({message : "Hello world patch"})
})

app.delete("/bin" , (req , res) => {
    res.json({message : "Delete "})
})

app.listen(7000, () => {
    console.log('Server started at http://localhost:7000')
})
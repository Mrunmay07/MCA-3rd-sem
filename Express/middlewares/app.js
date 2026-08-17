import express from "express"

const app = express()

// Global middleware
/* app.use((req , res , next) => {
    let body = ""
    req.on("data" , (chunk) => {
        body += chunk
    })
    req.on("end" , () => {
        req.body = JSON.parse(body)
        next()
        })
}) */

app.use(express.json())


app.post("/register", (req , res) => {
    console.log(req.body)
    res.end("User registered successfully")
})

app.post("/login" , (req , res) => {
    console.log(req.body)
    res.end("User logged in successfully")
})

app.listen(7000 , () => {
    console.log('Server started at http://localhost:7000/')
})
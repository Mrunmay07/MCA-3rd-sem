import express from "express"

const app = express()

app.use(express.static("public"))

app.get("/" , (req , res) => {
    res.json({message : "Hello world"})
})

app.get("/test" , (req , res) => {
    res.sendFile(`${import.meta.dirname}/public/hollow.jpg`)
})

app.listen(7000, () => {
    console.log('Server started at http://localhost:7000')
})
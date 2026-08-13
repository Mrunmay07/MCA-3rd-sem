import http from "node:http"
import products from "./products.json" with {type:"json"}
import users from "./users.json" with {type:"json"}


const server = http.createServer((req , res) => {
    if(req.url === '/'){
        res.end("This is home route")
    }
    else if(req.url === '/products'){
        res.end(JSON.stringify(products))
    }
    else if(req.url === '/users'){
        res.end(JSON.stringify(users))
    }
})

server.listen(7000 , () => {
    console.log('Server started at http://localhost:7000/')
})
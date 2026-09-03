import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"


const app = express();

app.use(express.static("view")) // SSR

app.use(express.json());
app.use(cookieParser())


// Routes
app.use("/users"  ,userRoutes )
app.use("/blogs" , blogRoutes)

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000");
});


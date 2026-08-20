import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };
import crypto from "crypto"
import multer from "multer"
import path from 'path'
import { writeFile } from "fs/promises";

const app = express();

app.use(express.json())

// Multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID()
    const extension = path.extname(file.originalname)
   cb(null , `${id}${extension}`)
  }
})

const upload = multer({ storage: storage })


// GET blogs
app.get("/blogs", (req, res) => {
  res.json(blogsData);
});

// GET blogs by Search
app.get("/blogs/search", (req, res) => {
  const { s } = req.query;

  const filteredBlogs = blogsData.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(s.toLowerCase()) ||
      blog.content.toLowerCase().includes(s.toLowerCase())
    );
  });

  return res.status(200).json(filteredBlogs);
});

// GET blogs by id
// Dynamic route
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (!blogsData) {
    res.status(404).json("Blog not found");
  }

  return res.status(200).json(blog);
});

// Create a Blog
app.post("/blogs" , upload.single('image') ,async (req , res) => {
  const {title , content , author} = req.body

  if(!title || !content || !author){
    return res.status(400).json({message : "All fields are requried"})
  }

  const blogId = crypto.randomUUID()

  const newBlog = {
    id: blogId,
    title,
    content,
    author,
    likes : 0,
    comments : [],
    image: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt:new Date().toISOString(),
    updatedAt : new Date().toISOString()
  }

  blogsData.push(newBlog)

 try {
   await writeFile("./blogsDB.json" , JSON.stringify(blogsData , null , 2) )
   return res.status(201).json({message : "Blog created successfully"})
 } catch (err) {
    return res.status(401).json({message : err })
 }

})

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000");
});

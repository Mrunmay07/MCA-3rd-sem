import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };
import usersData from "./usersDB.json" with {type : "json"}
import crypto from "crypto";
import multer from "multer";
import path from "path";
import { writeFile } from "fs/promises";

const app = express();

app.use(express.json());

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    cb(null, `${id}${extension}`);
  },
});

const upload = multer({ storage: storage });

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
app.post("/blogs", upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  const blogId = crypto.randomUUID();

  const newBlog = {
    id: blogId,
    title,
    content,
    author,
    likes: 0,
    comments: [],
    image: req.file ? `/uploads/${req.file.filename}` : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogsData.push(newBlog);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
});

// Likes
app.post("/blogs/:id/likes", async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  blog.likes += 1;

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Liked a Blog" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to like blog" });
  }
});

// Unlike

// update blog -> PATCH
app.patch("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const { title, content, author } = req.body;

  if (title !== undefined) blog.title = title;
  if (content !== undefined) blog.content = content;
  if (author !== undefined) blog.author = author;

  blog.updatedAt = new Date().toISOString();

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog Updated" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to Update a  blog" });
  }
});

// Delete a blog -> DELETE
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blogIndex = blogsData.findIndex((blog) => blog.id === id); // 2

  blogsData.splice(blogIndex, 2);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Deleted a blog" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete a  blog" });
  }
});

// Add Comment - POST
app.post("/blogs/:id/comment", async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);
  const { user, text } = req.body;

   if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }


  if (!user || !text) {
    return res.json({ message: "All fields are required!" });
  }

  const comment = {
    id : crypto.randomUUID(),
    user,
    text,
    createdAt : new Date().toISOString()
  };

  blog.comments.push(comment)

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Comment added" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to comment " });
  }

});

// register 
app.post("/users/register" , async (req , res) => {
    const {username , email , password} = req.body

    if(!username || !email || !password){
      return res.json({message : "All fields are required to register"})
    } 

    const newUser = {
      id : crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    usersData.push(newUser)
    
    try {
      await writeFile("./usersDB.json" , JSON.stringify(usersData , null , 2))
      return res.status(201).json({message : "User registered"})
    } catch (err) {
      return res.status(400).json({message : "User failed to register"})
    }

})


// login
app.post("/users/login" , (req , res) => {
    const {email , password} = req.body

    if()
})


app.listen(7000, () => {
  console.log("Server started at http://localhost:7000");
});

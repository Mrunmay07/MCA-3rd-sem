import express from "express";
import blogsData from "../blogsDB.json" with { type: "json" };
import crypto from "crypto";
import multer from "multer";
import path from "path";
import { writeFile } from "fs/promises";
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()


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
router.get("/", (req, res) => {
  res.json(blogsData);
});

// GET blogs by Search
router.get("/search", (req, res) => {
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
router.get("/:id", (req, res) => {
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
router.post("/", authMiddleware,upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  const blogId = crypto.randomUUID();

  const newBlog = {
    id: blogId,
    userId: req.user.id,
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
router.post("/:id/likes", authMiddleware,async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);
  

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const alreadyLiked  = blog.likes.find((like) => like.userId === req.user.id )

  if(alreadyLiked){
    return res.json({message : "You already liked this blog"})
  }

  blog.likes.push({
    userId : req.user.id
  })

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Liked a Blog" , count : blog.likes.length});
  } catch (err) {
    return res.status(400).json({ message: "Failed to like blog" });
  }
});

// Unlike 

// update blog -> PATCH
router.patch("/:id", authMiddleware,async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id && req.user.id === blog.userId);

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
} );

// Delete a blog -> DELETE
router.delete("/:id", authMiddleware,async (req, res) => {
  const { id } = req.params;
  const blogIndex = blogsData.findIndex((blog) => blog.id === id && req.user.id === blog.userId); // 2

  if(blogIndex === -1){
    return res.json({message : "Blog not found or unauthorized"})
  }

  blogsData.splice(blogIndex, 2);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Deleted a blog" });
  } catch (err) {
    return res.status(400).json({ message: "Failed to delete a  blog" });
  }
});

// Add Comment - POST
router.post("/:id/comment", authMiddleware,  async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id );
  const {text } = req.body;

   if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (!text) {
    return res.json({ message: "All fields are required!" });
  }

  const comment = {
    id : crypto.randomUUID(),
    userId : req.user.id,
    user : req.user.username,
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



export default router
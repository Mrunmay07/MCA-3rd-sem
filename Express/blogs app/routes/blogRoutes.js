import express from "express";
import crypto from "crypto";
import multer from "multer";
import path from "path";
import { writeFile } from "fs/promises";
import authMiddleware from '../middleware/authMiddleware.js'
import Blog from "../models/Blog.js";


const router = express.Router()


// Cloudinary config
 cloudinary.config({ 
        cloud_name: 'pcrlbprk', 
        api_key: '196242149374733', 
        api_secret: 'oRUG1SUhQ7aLB7PokZx3JmROHNA' // Click 'View API Keys' above to copy your API secret
    });

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
router.get("/", async (req, res) => {
  const blogs = await Blog.find()
  return res.json(blogs)
});

// GET blogs by Search
router.get("/search", async (req, res) => {
  const { s } = req.query;

  const blogs = await Blog.find({$or: [
    {
      title : {
        $regex : s,
        $options:"i"
      }
    },
    {
      content:{
        $regex:s,
        $options : "i"
      }
    }
  ]})


  return res.status(200).json(blogs);
});

// GET blogs by id
// Dynamic route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  
  return res.status(200).json(blog);
});

// Create a Blog
router.post("/", authMiddleware,upload.single("image"), async (req, res) => {


  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  let imageUrl = null;

  if(req.file){
    const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path,{
            folder : "blog-images"
           }
       )
    
       imageUrl = uploadResult.secure_url
      
  }

  await Blog.create({
    title ,
    content,
    author,
    userId : req.user._id,
    image : imageUrl
  })
  
  return res.status(201).json({message : "Blog created successfully"})
  
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
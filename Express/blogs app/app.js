import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };

const app = express();

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

// Create blog
app.post("/blogs" , (req , res) => {
  // id,title , content , author , image 
})

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000");
});

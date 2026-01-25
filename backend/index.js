const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary blog data
let blogs = [
  {
    id: 1,
    title: "Welcome to My Blog",
    content: "This blog is built using React and Node.js"
  }
];

// Get all blogs
app.get("/blogs", (req, res) => {
  res.json(blogs);
});

// Add a blog
app.post("/blogs", (req, res) => {
  const blog = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  blogs.push(blog);
  res.status(201).json(blog);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

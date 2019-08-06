const express = require("express");

const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

const port = 8020;
server.listen(port, () => {
  console.log(`Captain, your API is running on port ${port}`);
});

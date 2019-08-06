const router = require("express").Router();

const Posts = require("../data/db");

// GET all posts
router.get("/", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of posts could not be retrieved" });
    });
});

// GET posts by ID
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  postId = req.params.id;
  Posts.findById(postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving post" });
    });
});

// Add new post
router.post("/", (req, res) => {
  const postInfo = req.body;
  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "There was an error adding the post" });
    });
});

//Add a comment to a post using the post's ID
router.post("/:id/comments", (req, res) => {
  console.log(req.body);
  const commentInfo = req.body;
  Posts.insertComment(commentInfo)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get comment by post ID" });
    });
});

module.exports = router;

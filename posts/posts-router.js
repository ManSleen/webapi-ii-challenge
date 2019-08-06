const router = require("express").Router();

const Posts = require("../data/db");

// GET all posts
router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of posts could not be retrieved" });
    });
});

// GET posts by ID
router.get("/:id", (req, res) => {
  postId = req.params.id;
  Posts.findById(postId)
    .then(post => {
      console.log(post);
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving post" });
    });
});

// Add new post
router.post("/", (req, res) => {
  const postInfo = req.body;
  if (postInfo.title && postInfo.contents) {
    Posts.insert(postInfo)
      .then(post => {
        res.status(201).json(postInfo);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      message: "Please provide a title and some content for the post."
    });
  }
});

//Add a comment to a post using the post's ID
router.post("/:id/comments", (req, res) => {
  const commentInfo = req.body;
  commentInfo.post_id = req.params.id;
  if (commentInfo.text) {
    Posts.insertComment(commentInfo)
      .then(comment => {
        if (comment) {
          res.status(201).json(commentInfo);
        } else {
          res.status(500).json({
            message: "There was an error saving the comment to the database"
          });
        }
      })
      .catch(error => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      });
  } else {
    res.status(400).json({ message: "Please provide text for the comment" });
  }
});

// GET all comments by post ID
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(comment => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

//Delete a Post using its ID
router.delete("/:id", (req, res) => {
  //First we extract the ID of the post we're trying to delete from req.params.id and save it in a variable called postId
  const postId = req.params.id;
  // We're initializing a variable foundPost to hold our found object
  let foundPost;
  // We're going to find the id of the item we're trying to delete
  Posts.findById(postId)
    .then(post => {
      // Once we find a matching post, we're going to save the found post into the already-initialized variable foundPost
      foundPost = post;
      //Then, still inside of .then(), we're going to delete the post
      Posts.remove(postId)
        .then(post => {
          if (post) {
            res.status(200).json(foundPost);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist"
            });
          }
          // And then we're returning the foundPost from above to show the user which item was deleted
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: "Could not find a post with that ID" });
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that post by ID" });
    });
});

//Update a post using specified id using data from request body
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes.title && changes.contents) {
    Posts.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(changes);
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error updating the post" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a title and contents for the post" });
  }
});

module.exports = router;

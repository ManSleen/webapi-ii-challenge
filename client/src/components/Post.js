import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsSection from "./CommentsSection";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "block"
  }
}));

const Post = ({ post, deletePost, addComment }) => {
  const [comments, setComments] = useState(null);

  const fetchComments = id => {
    axios
      .get(`http://localhost:8020/api/posts/${id}/comments`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchComments(post.id);
  }, [post]);

  const classes = useStyles();
  console.log(post);
  if (post) {
    return (
      <div>
        <ListItem align-items="flex-start">
          <ListItemText
            primary={post.title}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {post.contents}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  <br /> Date: {post.created_at}
                </Typography>
              </React.Fragment>
            }
          />

          <Button onClick={() => deletePost(post.id)}>Delete</Button>
        </ListItem>
        <CommentsSection
          post={post}
          addComment={addComment}
          comments={comments}
        />
        <Divider component="li" />
      </div>
    );
  } else {
    return <div>Loading posts...</div>;
  }
};

export default Post;

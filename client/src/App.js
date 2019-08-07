import React, { useEffect, useState } from "react";
import axios from "axios";

import PostList from "./components/PostList";
import AppBar from "./components/AppBar";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

function App() {
  const classes = useStyles();

  const [posts, setPosts] = useState(null);

  const fetchPosts = () => {
    axios
      .get("http://localhost:8020/api/posts")
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletePost = id => {
    axios
      .delete(`http://localhost:8020/api/posts/${id}`)
      .then(res => {
        fetchPosts();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <AppBar />
          <Paper className={classes.root}>
            <PostList deletePost={deletePost} posts={posts} />
          </Paper>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;

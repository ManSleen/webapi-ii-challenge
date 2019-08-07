import React from "react";
import Post from "./Post";

import List from "@material-ui/core/List";

const PostList = ({ posts, deletePost }) => {
  return (
    <List>
      {posts ? (
        posts.map(post => <Post deletePost={deletePost} post={post} />)
      ) : (
        <div>Loading...</div>
      )}
    </List>
  );
};

export default PostList;

import React, { useState } from "react";

const PostForm = ({ addPost }) => {
  const [post, setPost] = useState({
    title: "",
    contents: ""
  });

  const handleChange = e => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    addPost(post);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post.title}
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <input
          type="textarea"
          value={post.contents}
          placeholder="Post Content"
          name="contents"
          onChange={handleChange}
        />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;

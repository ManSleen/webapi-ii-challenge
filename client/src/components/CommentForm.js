import React, { useState } from "react";

const CommentForm = ({ addComment, post }) => {
  console.log(post);
  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    addComment(post.id, comment);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Comment"
          name="text"
          onChange={handleChange}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;

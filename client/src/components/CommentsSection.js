import React from "react";
import CommentForm from "./CommentForm";

const CommentsSection = ({ comments, addComment, post }) => {
  console.log(comments);

  return (
    <div className="comments-container">
      {comments ? comments.map(comment => <p>{comment.text}</p>) : null}
      <CommentForm post={post} addComment={addComment} />
    </div>
  );
};

export default CommentsSection;

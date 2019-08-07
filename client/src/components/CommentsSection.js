import React from "react";

const CommentsSection = ({ comments }) => {
  console.log(comments);

  return (
    <div className="comments-container">
      {comments ? comments.map(comment => <p>{comment.text}</p>) : null}
    </div>
  );
};

export default CommentsSection;

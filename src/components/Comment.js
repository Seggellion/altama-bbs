// Comment.js

import React from 'react';

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.text}</p>
    </div>
  );
}

export default Comment;

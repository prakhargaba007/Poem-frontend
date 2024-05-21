"use client";

// AddComment.jsx
import { useState } from "react";
import classes from "./AddComment.module.css";

export default function AddComment({ slug, updateComments }) {
  const [comment, setComment] = useState("");

  let userId = localStorage.getItem("userId");
  // console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      return;
    }
    // console.log("url", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment.");
      }

      // Get the complete comment data from the response
      const newComment = await response.json();
      // console.log("1", newComment.post.comment);

      // Update the comments state in the parent component
      updateComments(
        newComment.post
        // newComment.post.comment
        // comment: newComment.post.comment[newComment.post.comment.length - 1],
      );

      // Reset the comment input after successful submission
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <>
      <form className={classes.commentForm} onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          required
          value={comment}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </>
  );
}

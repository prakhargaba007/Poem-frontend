"use client";

import { useState } from "react";
import classes from "./AddComment.module.css";

export default function AddComment({ slug, updateComments, setError }) {
  const [comment, setComment] = useState("");

  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  // console.log(userId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("url", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      if (!userId) {
        throw new Error("User not authenticated.");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );

      if (!response.ok) {
        console.log("s",response);
        throw new Error("Failed to add comment.");
      }

      // Get the complete comment data from the response
      const newComment = await response.json();
      console.log("1", newComment);

      // Update the comments state in the parent component
      updateComments(
        newComment.post
        // newComment.post.comment
        // comment: newComment.post.comment[newComment.post.comment.length - 1],
      );

      // Reset the comment input after successful submission
      setComment("");
    } catch (error) {
      console.error(error);
      console.log(error.details);
      setError(error.message);
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

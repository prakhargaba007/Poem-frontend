"use client";
import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import classes from "./thumbsUp.module.css";

export default function ThumsUp({ slug, data }) {
  const [liked, setLiked] = useState(false);
  //   console.log("ssssss", data);
  const likes = data.likes.length;

  // Function to handle like button click
  const handleLike = async () => {
    try {
      if (liked) {
        likes + 1;
      }
      if (!liked) {
        likes - 1;
      }
      const response = await fetch(
        `http://localhost:8080/feed/post/${slug}/likeComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId: data._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like/unlike the post.");
      }

      const responseData = await response.json();
      // Update liked state based on the response result
      setLiked(responseData.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={classes.thumsUp}>
      <p>{likes}</p>
      {liked ? (
        <FaThumbsUp size={30} onClick={handleLike} />
      ) : (
        <FaRegThumbsUp size={30} onClick={handleLike} />
      )}
    </div>
  );
}

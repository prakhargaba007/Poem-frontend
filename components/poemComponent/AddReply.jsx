"use client";

import { useState } from "react";
import classes from "./AddReply.module.css";

export default function AddReply({ slug, updateReplies, comment }) {
  const [reply, setReply] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  let userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId) {
      return;
    }

    let token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post/${slug}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            reply: reply,
            commentId: comment._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add reply.");
      }

      // Get the complete reply data from the response
      const newReply = await response.json();
      // console.log("newReply", newReply);

      // Update the replies state in the parent component
      updateReplies(newReply.reply);
      // updateReplies({ newReply: newReply.reply, commentId: comment._id });

      // Reset the reply input after successful submission
      setReply("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleInputChange = (event) => {
    setReply(event.target.value);
  };

  const handleReplyButtonClick = () => {
    if (!userId) {
      return;
    }
    setShowReplyForm(true);
  };

  const handleCancelClick = () => {
    setShowReplyForm(false);
  };

  return (
    <>
      {!showReplyForm && (
        <button className={classes.replyBtn} onClick={handleReplyButtonClick}>
          Reply
        </button>
      )}

      {showReplyForm && (
        <form className={classes.replyForm} onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a reply..."
            required
            value={reply}
            onChange={handleInputChange}
          ></textarea>
          <div className={classes.buttons}>
            <button
              className={classes.replyBtn}
              type="button"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button className={classes.button1} type="submit">
              Post Reply
            </button>
          </div>
        </form>
      )}
    </>
  );
}

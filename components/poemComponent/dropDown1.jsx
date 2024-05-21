import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import classes from "./dropDown.module.css";

export default function DropDown({ slug, data, updatedReply, commentId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async () => {
    // console.log("commentId", commentId);
    const newReply = prompt("Enter your new reply:");
    if (newReply !== null) {
      try {
        // console.log("hihi", data._id);
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/feed/post/${slug}/reply/editReply`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newReply: newReply,
              commentId,
              replyId: data._id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit the reply.");
        }

        const resData = await response.json();
        // console.log(resData);
        updatedReply(resData.result);
        // updatedReply({ commentId: commentId, newReply: resData.reply });
      } catch (error) {
        console.error("Error editing the reply:", error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reply?"
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post/${slug}/reply/removeReply`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              commentId,
              replyId: data._id, // Assuming you have replyId in your data
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the reply.");
        }

        const resData = await response.json();
        // console.log("data", resData.newPost);
        updatedReply(resData.newPost);

        // Optionally, you can handle success here
      } catch (error) {
        console.error("Error deleting the reply:", error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn}>
        <FiMoreVertical size={19} />
      </button>
      <div className={classes.dropdownContent}>
        <button onClick={handleEdit}>Edit Reply</button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Reply"}
        </button>
      </div>
    </div>
  );
}

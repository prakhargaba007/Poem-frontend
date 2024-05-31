"use client";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import classes from "./dropDown.module.css";

export default function DropDown({ slug, data, updatedComments }) {
  const [isDeleting, setIsDeleting] = useState(false);
  let token = localStorage.getItem("token");

  const handleEdit = async () => {
    const comment = prompt("Enter your new comment:");
    if (comment !== null) {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/feed/post/${slug}/editComment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              comment,
              commentId: data._id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to edit the comment.");
        }

        const resData = await response.json();
        updatedComments(resData.newPost);
        // updatedComments(resData.newPost.comment);
      } catch (error) {
        console.error("Error editing the comment:", error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    // console.log(data._id);
    // console.log(slug);
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/feed/post/" +
            slug +
            "/removeComment",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              commentId: data._id,
            }),
          }
        );
        // console.log(response);

        if (!response.ok) {
          throw new Error("Failed to delete the comment.", response.ok);
        }
        const resData = await response.json();
        updatedComments(resData.newPost);

        // Optionally, you can handle success here
      } catch (error) {
        console.error("Error deleting the comment:", error);
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
        <button onClick={handleEdit}>Edit Comment</button>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Comment"}
        </button>
      </div>
    </div>
  );
}

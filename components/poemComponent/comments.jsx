"use client";

import { useEffect, useState } from "react";
import AddReply from "./AddReply";
import classes from "./comments.module.css";
import Reply from "./reply";
import ThumsUp from "./thumbsUp";
import DropDown from "./dropDown";

export default function Comments({ slug, comments, updateComments }) {
  const [postData, setPostData] = useState([]);

  let userId = localStorage.getItem("userId");
  // console.log(userId);

  useEffect(() => {
    setPostData(comments);
  }, [comments]);

  function updateReplies(data) {
    updateComments(data);
  }
  // console.log(postData);

  function updatedComments(data) {
    updateComments(data);
  }
  return (
    <>
      {postData.length !== 0 ? (
        postData.map((data) => (
          <li key={data._id} className={classes.comments}>
            <div className={classes.comment}>
              <div className={classes.userComment}>
                <div>
                  <p className={classes.commentAuthor}>
                    {data.author.name} says:
                  </p>
                  <p className={classes.commentText}>{data.comment}</p>
                </div>
                {/* <ThumsUp slug={slug} data={data} /> */}
                {async () => {
                  console.log("ye to hua", data.author._id);
                }}
                {data.author._id === userId && (
                  <DropDown
                    slug={slug}
                    data={data}
                    updatedComments={updatedComments}
                  />
                )}
              </div>
              <AddReply
                slug={slug}
                comment={data}
                updateReplies={updateReplies}
              />
              <ul>
                <Reply updateReplies={updateReplies} slug={slug} reply={data} />
              </ul>
            </div>
          </li>
        ))
      ) : (
        <div>No comments</div>
      )}
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import DropDown from "./dropDown1";
import classes from "./reply.module.css";
import ThumsUp from "./thumbsUp1";

export default function Reply({ updateReplies, slug, reply }) {
  const [postData, setPostData] = useState(reply);

  let userId = localStorage.getItem("userId");

  useEffect(() => {
    setPostData(reply);
  }, [reply]);

  function updatedReply(data) {
    updateReplies(data);
  }
  // console.log(postData.author._id);
  return (
    <>
      {postData ? (
        postData.reply.map((data) => (
          <li key={data._id} className={classes.replies}>
            <div className={classes.reply}>
              <div>
                <p className={classes.replyAuthor}>
                  {data.author.name} replies:
                </p>
                <p className={classes.replyText}>{data.reply}</p>
              </div>
              {/* <ThumsUp slug={slug} data={data} /> */}
              {data.author._id === userId && (
                <DropDown
                  slug={slug}
                  data={data}
                  commentId={postData._id}
                  updatedReply={updatedReply}
                />
              )}
            </div>
          </li>
        ))
      ) : (
        <div className={classes.noReply}>No Replies Yet.</div>
      )}
    </>
  );
}

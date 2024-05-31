"use client";

import React, { useState, useEffect } from "react";
import classes from "./page.module.css";
import { createNewPost } from "@/lib/actions";
import { useFormState } from "react-dom";

const PoemForm = ({ toggleForms }) => {
  const [state, formAction] = useFormState(createNewPost, { error: null });

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    // Access localStorage only on the client side
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h1>Add Poem</h1>
          <form action={formAction}>
            <div className={classes["input-group"]}>
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                id="post-title"
                name="title"
                placeholder="Enter the title"
              />
              {/* {state.error && (
                <span className={classes.error}>Title is required</span>
              )} */}
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="post-content">Content</label>
              <textarea
                id="post-content"
                name="content"
                placeholder="Enter the content"
              />
              {/* {state.error && (
                <span className={classes.error}>Content is required</span>
              )} */}
            </div>
            {userId && (
              <div className={classes["input-group"]}>
                <input type="hidden" name="author" value={userId} />
                <input type="hidden" name="token" value={token} />
              </div>
            )}
            <button type="submit" className={classes.btn}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PoemForm;

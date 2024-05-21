"use client";

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import { shareProfileData } from "@/lib/actions";
import { useFormState } from "react-dom";

const SignupForm = ({ toggleForms }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Access localStorage only on the client side
    setUserId(localStorage.getItem("userId"));
  }, []);
  const [state, formAction] = useFormState(shareProfileData, { error: null });

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h1>Edit Profile</h1>
          <form action={formAction}>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-name">Name</label>
              <input
                type="text"
                id="signup-name"
                name="name"
                // onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <input value={userId} name="userId" required hidden />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-gender">Gender</label>
              <select
                id="signup-gender"
                // onChange={(e) => setGender(e.target.value)}
                name="gender"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* <option value="other">Other</option> */}
              </select>
            </div>
            {state.error && <p className={classes.error}>{state.error}</p>}
            <button type="submit" className={classes.btn}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

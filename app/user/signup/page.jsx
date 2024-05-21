"use client";

import React, { useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupForm = ({ toggleForms }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!name || !email || !password || !confirmPassword || !gender) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            gender,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign in.");
      }

      const data = await response.json();

      // console.log("Signup successful:", data);

      router.push("/user/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-name">Name</label>
              <input
                type="text"
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="signup-gender">Gender</label>
              <select
                id="signup-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
            {error && <p className={classes.error}>{error}</p>}
            <button type="submit" className={classes.btn}>
              Sign Up
            </button>
            {/* <div className={classes["social-login"]}>
              <button className={`${classes.btn} ${classes["google-btn"]}`}>
                Sign Up with Google
              </button>
              <button className={`${classes.btn} ${classes["facebook-btn"]}`}>
                Sign Up with Facebook
              </button>
            </div> */}
            <p className={classes["toggle-link"]}>
              Already have an account?{" "}
              <Link href="/user/login" onClick={toggleForms}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

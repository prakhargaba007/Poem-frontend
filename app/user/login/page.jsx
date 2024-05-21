"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import Link from "next/link";
// import { revalidatePath } from "next/cache";

const LoginForm = ({ toggleForms }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password (you can implement your own validation logic)
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to log in.");
      }

      const resData = await response.json();

      // console.log("Login successful:", resData);

      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes["form-container"]}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={classes["input-group"]}>
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={classes["input-group"]}>
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className={classes.error}>{error}</p>}
            <button type="submit" className={classes.btn}>
              Login
            </button>
            <a href="#" className={classes["forgot-link"]}>
              Forgot Password?
            </a>
            {/* <div className={classes["social-login"]}>
              <button className={classes.btn + " " + classes["google-btn"]}>
                Login with Google
              </button>
              <button className={classes.btn + " " + classes["facebook-btn"]}>
                Login with Facebook
              </button>
            </div> */}
            <p className={classes["toggle-link"]}>
              Don&apos;t have an account?{" "}
              <Link href="/user/signup" onClick={toggleForms}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

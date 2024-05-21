"use client";
export default async function handleUserLogin(data) {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to log in.");
    }

    const resData = await response.json();

    console.log("Login successful:", resData);

    localStorage.setItem("token", resData.token);
    localStorage.setItem("userId", resData.userId);
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

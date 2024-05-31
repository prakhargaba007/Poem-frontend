"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
// import handleUserLogin from "./localStorage";
// import handleUserLogin from "./localStorage";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareProfileData(prevState, formData) {
  const meal = {
    name: formData.get("name"),
    gender: formData.get("gender"),
    userId: formData.get("userId"),
  };

  console.log("meals", meal);

  if (
    isInvalidText(meal.name) ||
    isInvalidText(meal.gender)
    // !meal.image ||
    // meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await handleSubmit(meal);
  revalidatePath("/user/profile", "layout" /* , true */); // TODO: Fix this to work with getServerSideProps
  redirect("/user/profile");
}

const handleSubmit = async (data) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/updateUser",
      // "https://poem-backend-9rqh.onrender.com/auth/updateUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to edit details.");
    }

    const resData = await response.json();

    console.log("editing user details successful:", resData);

    // router.push("/user/login");
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export async function createNewPost(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    content: formData.get("content"),
    userId: formData.get("author"),
  };

  console.log("meals", meal);

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.content) ||
    isInvalidText(meal.userId)
  ) {
    return {
      message: "Invalid input.",
    };
  }

  // Attempt to submit the post and handle errors
  try {
    await handleSubmitPost(meal);
    revalidatePath("/books", "layout" /* , true */); // TODO: Fix this to work with getServerSideProps
    redirect("/books");
  } catch (error) {
    console.error("Error creating new post:", error);
    // Return an error response or handle it accordingly
    return {
      message: error.message,
    };
  }
}

const handleSubmitPost = async (data) => {
  try {
    console.log("ok");
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/feed/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create post.");
    }

    const resData = await response.json();
    console.log("Post created successfully:", resData);
  } catch (error) {
    console.log("not ok");
    console.error("Error creating post:", error);
    throw error; // Re-throw the error to be caught in createNewPost
  }
};

export async function userLogin(prevState, formData) {
  const meal = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log("meals", meal);

  if (isInvalidText(meal.email) || isInvalidText(meal.password)) {
    return {
      message: "Invalid input.",
    };
  }
  await handleUserLogin(meal);
  revalidatePath("/", "page" /* , true */); // TODO: Fix this to work with getServerSideProps
  redirect("/");
}
async function handleUserLogin(data) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

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

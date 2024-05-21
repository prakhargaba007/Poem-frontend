"use client";
import PoemsGrid from "@/components/poemComponent/Poemsgrid";
import { useEffect, useState } from "react";

async function fetchMeals() {
  // console.log(process.env.URL);
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/feed/posts"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts.");
    }
    // console.log("res", response);
    const resData = await response.json();
    return resData.posts;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      const mealsData = await fetchMeals();
      // console.log(mealsData);
      setMeals(mealsData);
    }
    loadMeals();
  }, []);

  return <PoemsGrid poems={meals} />;
}

export default function BooksPage() {
  return (
    <>
      <section className="book-content">
        <h2>Book Content</h2>
        <Meals />
      </section>
    </>
  );
}

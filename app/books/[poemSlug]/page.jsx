"use client";
// Poem.jsx
import React, { useState, useEffect } from "react";
import PoemDetails from "@/components/poemComponent/poenDetail";
import AddComment from "@/components/poemComponent/AddComment";
import Comments from "@/components/poemComponent/comments";

function Poem({ params }) {
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState("");
  let token = localStorage.getItem("token");

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post/${params.poemSlug}`;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setPostData(data.post);
    }

    fetchData();
  }, [params.poemSlug]);

  const updateComments = (newComment) => {
    setPostData(newComment);
  };
  const addError = (error) => {
    console.log("erro", error);
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PoemDetails poemDetail={postData} />
      <section>
        <AddComment
          slug={params.poemSlug}
          updateComments={updateComments}
          setError={addError}
        />
        <p>{error}</p>
        <ul>
          <Comments
            slug={params.poemSlug}
            comments={postData.comment}
            updateComments={updateComments}
          />
        </ul>
      </section>
    </>
  );
}

export default Poem;

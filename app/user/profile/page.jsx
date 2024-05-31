"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import image from "@/public/avatar.png";
import Image from "next/image";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Access localStorage only on the client side
    setUserId(localStorage.getItem("userId"));
  }, []);
  // console.log(userId);
  let token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/profile",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching profile data");
        }

        const data = await response.json();
        // console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userId]); // Include userId in the dependency array

  // console.log("pd", profileData);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          {/* Render profile data if available */}
          {profileData && (
            <>
              <Image
                src={image}
                alt="User Image"
                className={styles.profileImage}
              />
              <h1 className={styles.userName}>{profileData.name}</h1>
              <p className={styles.userEmail}>{profileData.email}</p>
              <p className={styles.userGender}>Gender: {profileData.gender}</p>
              <Link
                href={{
                  pathname: "/user/profile/editProfile",
                }}
              >
                <button className={styles.editBtn}>Edit Profile</button>
              </Link>
            </>
          )}
        </div>
        {/* {profileData.isAdmin ? ( */}
        <div className={styles.poemsSection}>
          <h2>My Poems</h2>
          <p>
            Total Poems:{" "}
            {profileData && profileData.posts ? profileData.posts.length : 0}
          </p>
          {/* Render poem list if available */}
          {profileData && profileData.posts && (
            <ul className={styles.poemList}>
              {profileData.posts.map((poem, index) => (
                <li key={index}>
                  <span className={styles.poemTitle}>{poem.title}</span>
                  <button className={styles.editPoemBtn}>Edit</button>
                </li>
              ))}
            </ul>
          )}
          <Link href="/user/profile/addPoem">
            <button className={styles.editPoemBtn}>Add Poem</button>
          </Link>
        </div>
        {/* ) : (
          <div className={styles.poemsSection}>
            <h3>This user is not an admin.</h3>
            <p>Contact us to become a poet.</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Profile;

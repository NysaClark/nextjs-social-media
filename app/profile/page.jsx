"use client";
import React from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import userData from "@/app/UserData";
import Post from "@/components/Post";
import styles from "./page.module.css";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/profile/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    const location = e.target[1].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          content,
          location,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className="mainSection">
          {isLoading ? "loading" : data?.map((post, index) => {
            return <Post key={index} post={post} />
          })}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Add New Post</h1>
          <textarea
            placeholder="What's happening?"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <input type="text" className={styles.input} placeholder='Where?' />
          <button className={styles.button}>Post</button>
        </form>
      </div>
    )
  }
}

export default Profile
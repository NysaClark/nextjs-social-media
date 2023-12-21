"use client";
import React, {useState} from 'react'
import useSWR from "swr"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import userData from "@/app/UserData";
import Post from "@/components/Post";
import styles from "./page.module.css";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("")

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
    const content = e.target[1].value;
    const location = e.target[2].value;

    console.log(content);
    console.log(location)

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          content,
          location,
          image: imageUrl,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const cloudHandler = async (e) => {
    let formData = new FormData();

    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "fzb6pfvt");

    await fetch("https://api.cloudinary.com/v1_1/dyqkdxjqh/image/upload", {
      method: "POST",
      body: formData
    }).then(async (res) => {
      if(res.ok){
        const data = await res.json();
        setImageUrl(data.secure_url);
      }else{
        console.log(res)
      }
    })
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className="mainSection">
          {isLoading ? "loading" : data?.map((post, index) => {
            return <Post key={index} post={post} handleDelete={handleDelete} />
          })}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Add New Post</h1>
          <input type="file" placeholder="Image" name="image" onChange={cloudHandler} className={styles.input} />
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
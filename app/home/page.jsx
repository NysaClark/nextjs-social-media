"use client"
import React, {useState, useEffect} from "react";
import { MdSettings, MdInsertPhoto, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useClickOutside } from "@mantine/hooks";
// import userData from "@/app/UserData";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import Avatar from "public/avatar.png"

import Image from "next/image";

const Page = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));

  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch("/api/posts", {
        cache: "no-store",
      });

      if (!res.ok) {
        setErr(true);
      }

      const data = await res.json()

      setData(data);
      setIsLoading(false);
    };
    getData()
  }, []);

  return (
    <>
      <div className="mainContainer">
        <Sidebar />
        <div className="mainSection">
          {data.map((post, index) => {
            return <Post key={index} post={post} />
          })}
        </div>

        <div className="rightSection">
          <div className="requestWidget">
            <h3>Requests</h3>
            <div className="requestProfile">
              <div className="details">
                <div className="profileImage">
                  <Image src={Avatar} alt="" />
                </div>
                <div className="userDetails">
                  <div className="name">Sophie Alexander</div>
                  <div className="username">@johndoe</div>
                </div>
              </div>
              <div className="actions">
                <button className="actionBtn">Accept</button>
                <button className="actionBtn">Reject</button>
              </div>
            </div>
            <div className="requestProfile">
              <div className="details">
                <div className="profileImage">
                  <img src={"https://images.unsplash.com/photo-1505695716405-61e75ecc5bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2lybCxib3l8fHx8fHwxNjg5NzcxMTE5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"} alt="" />
                </div>
                <div className="userDetails">
                  <div className="name">Phillip Tønder</div>
                  <div className="username">@philipTonder</div>
                </div>
              </div>
              <div className="actions">
                <button className="actionBtn">Accept</button>
                <button className="actionBtn">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

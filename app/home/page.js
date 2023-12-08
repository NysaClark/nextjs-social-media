"use client";
import React, { useState } from "react";
import { MdSettings, MdInsertPhoto, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useClickOutside } from "@mantine/hooks";
import userData from "@/app/UserData";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";

const Page = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));


  return (
    <>
      <div className="mainContainer">
        <Sidebar/>
        <div className="mainSection">
          {userData.map((user, index) => {
            return <Post key={index} userData={user} />
          })}
        </div>

        <div className="rightSection">
          <div className="requestWidget">
            <h3>Requests</h3>
            <div className="requestProfile">
              <div className="details">
                <div className="profileImage">
                  <img src={"avatar.png"} alt="" />
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

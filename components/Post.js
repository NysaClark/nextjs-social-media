import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBookmark,
} from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { TiDeleteOutline } from "react-icons/ti";
import Avatar from "public/avatar.png";
import Placeholder from "public/placeholder.jpg"

import Image from "next/image";

import { useSession } from "next-auth/react";

const Post = ({ post, handleDelete }) => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="postWrapper">
        <div className="header">
          <div className="left">
            <Image src={Avatar} alt="" className="profileImg" />
            <div className="userDetails">
              <div className="name">{post.username}</div>
              <div className="feeling">{post.location}</div>
            </div>
          </div>
          <div className="right">
            {session.status === "authenticated" && post.username === session.data.user.name && (
              <div
                className="delete"
                style={{ cursor: "pointer"}}
                onClick={() => {
                  handleDelete(post._id);
                }}
              >
                <TiDeleteOutline color="red" />
              </div>
            )}
          </div>
        </div>
        <div className="mainPostContent">
          <motion.img
            src={post.image || Placeholder.src}
            alt=""
            className="postImage"
            onClick={() => setOpen(!open)}
            animate={{ scale: open ? 2 : 1 }}
          />
          <p>{post.content}</p>
        </div>
        <div className="postFooter">
          <div className="postActions">
            <div className="left">
              <div className="likeBtn">
                <HiOutlineHeart />
              </div>
              <div className="commentBtn">
                <HiOutlineChatBubbleOvalLeftEllipsis />
              </div>
              <div className="shareBtn">
                <HiOutlineShare />
              </div>
            </div>
            <div className="right">
              <div className="saveBtn">
                <HiOutlineBookmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

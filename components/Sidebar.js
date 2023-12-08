import React from "react";
import { MdSettings } from "react-icons/md";
import {
  FaBell,
  FaBookmark,
  FaBrush,
  FaCompass,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";

import { useSession } from "next-auth/react";

const links = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Explore",
    icon: <FaCompass />,
  },
  {
    name: "Notifications",
    icon: <FaBell />,
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
  },
  {
    name: "Bookmarks",
    icon: <FaBookmark />,
  },
  {
    name: "Theme",
    icon: <FaBrush />,
  },
  {
    name: "Settings",
    icon: <MdSettings />,
  },
];

const Sidebar = () => {
  const session = useSession();

  return (
    <div className="leftSection">
      {/* <div className="userProfileWidget">
        <div className="profileImage">
          <img src={"avatar.png"} alt="" />
        </div>
        <div className="userDetails">
          <Link href={"/profile"} className="name">
            John Doe
          </Link>
          <div className="username">@johndoe</div>
        </div>
      </div> */}

      <div className="inSidebar">
        {links.map((link, index) => {
          return (
            <Link className="link" href="#" key={index}>
              <div className="icon">{link.icon}</div>
              <h3>{link.name}</h3>
            </Link>
          );
        })}
      </div>
      {session.status === "authenticated" && (
        <Link href={"/profile"} className="inBtn sidebarCreateBtn">
          Create Post
        </Link>
      )}
    </div>
  );
};

export default Sidebar;

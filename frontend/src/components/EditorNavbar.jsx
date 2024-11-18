import React from "react";
import logo from "../assets/logo.png";
import Avatar from "react-avatar";
import { FiDownload } from "react-icons/fi";

const EditorNavbar = () => {
  return (
    <div className="EditorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="" />
      </div>
      <p>
        File/ <span className="text-[gray]">MyProject</span>
      </p>
      <i className="cursor-pointer text-[25px]">
        <FiDownload />
      </i>
    </div>
  );
};

export default EditorNavbar;

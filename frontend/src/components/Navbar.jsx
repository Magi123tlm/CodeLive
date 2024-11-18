import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { apiBasedUrl, toggleClass } from "../helper.js";

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(apiBasedUrl + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.user);
        } else {
          setError(data.message);
        }
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
      <div className="logo">
        <img className="w-[150px] cursor-pointer" src={logo} alt="" />
      </div>
      <div className="links flex items-center gap-2">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
        <Link>Services</Link>
        <button
          onClick={logout}
          className="btnBlue !bg-red-500 min-w-[100px] ml-2 hover:!bg-red-600"
        >
          Logout
        </button>
        <Avatar
          name={data ? data.name : ""}
          size="40"
          round="50%"
          className="cursor-pointer ml-2"
          onClick={() => toggleClass(".dropDownNavbar", "hidden")}
        />
      </div>
      <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg  bg-[#1A1919]  w-[150px] h-[150px]">
        <div className="py-[10px] border-b-[1px] border-b-[#fff]">
          <h3 className="text-[16px] " style={{ lineHeight: 1 }}>
            {data ? data.name : ""}
          </h3>
        </div>
        <i
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <MdLightMode className="text-[20px]" />
          <p>Light Mode</p>
        </i>
        <i
          onClick={() => {
            setIsGridLayout((prev) => !prev);
          }}
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <BsGridFill className="text-[20px]" />
          {isGridLayout ? <p>List Layout</p> : <p>Grid Layout</p>}
        </i>
      </div>
    </div>
  );
};

export default Navbar;

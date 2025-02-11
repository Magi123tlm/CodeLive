import React, { useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/authPageSide.png";
import { Link, useNavigate } from "react-router-dom";
import { apiBasedUrl } from "../helper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(apiBasedUrl + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId);
          navigate("/");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className=" w-full min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className="w-[150px]" src={logo} alt="logo image" />
          <form onSubmit={submitForm} action="" className="w-full mt-[60px]">
            <div className="inputBox">
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            <p className="text-[gray]">
              Don't have an account?
              <Link to="/signup" className="text-[#00AEEF] underline">
                SignUp
              </Link>
            </p>
            <p className="text-red-500 text-[14px] my-2">{error}</p>
            <button className="btnBlue w-full mt-[20px]">Login</button>
          </form>
        </div>
        <div className="right w-[55%]">
          <img
            className="h-[100vh] w-[100%] object-cover"
            src={image}
            alt="side image"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

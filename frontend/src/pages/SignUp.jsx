import React, { useState } from "react";
import logo from "../assets/logo.png";
import image from "../assets/authPageSide.png";
import { Link, useNavigate } from "react-router-dom";
import { apiBasedUrl } from "../helper";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    await fetch(apiBasedUrl + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          console.log(data);
          alert("Account Created Successfully ");
          navigate("/login");
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <>
      <div className=" w-full min-h-screen flex items-center justify-between pl-[100px]">
        <div className="left w-[35%]">
          <img className="w-[200px]" src={logo} alt="logo image" />
          <form onSubmit={submitForm} action="" className="w-full mt-[60px]">
            <div className="inputBox">
              <input
                type="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
            </div>
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
              Already have an account?
              <Link to="/login" className="text-[#00AEEF] underline">
                login
              </Link>
            </p>
            {error && <p className="text-red-500 text-15px my-2">{error}</p>}
            <button className="btnBlue w-full mt-[20px]">SignUp</button>
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

export default SignUp;

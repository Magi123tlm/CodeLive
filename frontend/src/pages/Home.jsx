import { useNavigate } from "react-router-dom";
import GridCard from "../components/GridCard.jsx";
import ListCard from "../components/ListCard.jsx";
import Navbar from "../components/Navbar.jsx";
import React, { useEffect, useState } from "react";
import { apiBasedUrl } from "../helper.js";

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredData = data
    ? data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const createProject = (e) => {
    if (projectTitle === "") {
      alert("Please Enter Valid Title");
    } else {
      fetch(apiBasedUrl + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setIsCreateModelShow(false);
            setProjectTitle("");
            alert("Project Created Successfully");
            navigate(`/editor/${data.projectId}`);
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  const getProject = () => {
    fetch(apiBasedUrl + "/getProjects", {
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
        if (data.success === true) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");

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
          setUserData(data.user);
        } else {
          setUserError(data.message);
        }
      });
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />
      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl">Hi {userData ? userData.username : ""}..</h2>
        <div className="flex items-center gap-1">
          <div className="inputBox !w-[350px]">
            <input
              required
              type="text"
              placeholder="Search Here.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsCreateModelShow(true)}
            className="btnBlue rounded-[5px] mb-5 text-[20px] !p-[5px] !px-[20px]"
          >
            +
          </button>
        </div>
      </div>
      <div className="cards">
        {isGridLayout ? (
          <div className="grid px-[100px]">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <GridCard key={index} item={item} />
              ))
            ) : (
              <p>No Projects Found</p>
            )}
          </div>
        ) : (
          <div className="list px-[100px] mb-4">
            {filteredData ? (
              filteredData.map((item, index) => (
                <ListCard key={index} item={item} />
              ))
            ) : (
              <p>No Projects Found</p>
            )}
          </div>
        )}
      </div>
      {isCreateModelShow ? (
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center ">
          <div className="createModel w-[25vw] h-[30vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputBox !bg-[#202020] mt-4">
              <input
                onChange={(e) => {
                  setProjectTitle(e.target.value);
                }}
                value={projectTitle}
                type="text"
                placeholder="Project Title"
              />
            </div>
            <div className="flex items-center gap-[10px] w-full mt-2">
              <button
                onClick={createProject}
                className="btnBlue rounded-[5px] w-[49%] mb-4 p-[5px] px-[10px] py-[10px] "
              >
                Create
              </button>
              <button
                onClick={() => setIsCreateModelShow(false)}
                className="btnBlue !bg-[#1A1919] rounded-[5px] w-[49%] mb-4 p-[5px] px-[10px] py-[10px] "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;

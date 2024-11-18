import React, { useEffect, useState } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { apiBasedUrl } from "../helper";
import { useParams } from "react-router-dom";

const EditorPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Set default value to false
  const [isTab, setIsTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("<h1>hello world</h1>");
  const [cssCode, setCssCode] = useState("body{background-color: gray}");
  const [jsCode, setJsCode] = useState("// some comment");

  let { ProjectId } = useParams();

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    run(); // Only call run once on mount, no need for setTimeout
  }, [htmlCode, cssCode, jsCode]); // Run on any change to HTML, CSS, or JS code

  useEffect(() => {
    fetch(apiBasedUrl + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projectId: ProjectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setHtmlCode(data.project.htmlCode);
          setCssCode(data.project.cssCode);
          setJsCode(data.project.jsCode);
        } else {
          console.error(data.message);
        }
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        fetch(apiBasedUrl + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projectId: ProjectId,
            htmlCode,
            cssCode,
            jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              alert("Project Saved Successfully");
            } else {
              alert("Something went wrong");
            }
          });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const changeTheme = () => {
    const editorNavbar = document.querySelector(".EditorNavbar");
    if (isLightMode) {
      editorNavbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editorNavbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  return (
    <>
      <EditorNavbar />
      <div className="flex">
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="tab-header flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div
                onClick={() => setIsTab("html")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                HTML
              </div>
              <div
                onClick={() => setIsTab("css")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                CSS
              </div>
              <div
                onClick={() => setIsTab("js")}
                className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]"
              >
                JAVASCRIPT
              </div>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={changeTheme}>
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>
          {isTab === "html" ? (
            <Editor
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              onChange={(value) => {
                setHtmlCode(value || "");
                run();
              }}
              value={htmlCode} // Use state value
            />
          ) : isTab === "css" ? (
            <Editor
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              onChange={(value) => {
                setCssCode(value || "");
                run();
              }}
              value={cssCode} // Use state value
            />
          ) : (
            <Editor
              height="80vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              onChange={(value) => {
                setJsCode(value || "");
                run();
              }}
              value={jsCode} // Use state value
            />
          )}
        </div>
        <iframe
          id="iframe"
          className={`w-${isExpanded ? "0" : "1/2"} ${
            isExpanded ? "hidden" : ""
          } min-h-[80vh] bg-[#fff] text-black`}
          src=""
          title="output"
        ></iframe>
      </div>
    </>
  );
};

export default EditorPage;

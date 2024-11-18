import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import NoPage from "./pages/NoPage.jsx";
import "./App.css";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import EditorPage from "./pages/EditorPage.jsx";

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/editor/:ProjectId"
            element={isLoggedIn ? <EditorPage /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="*"
            element={isLoggedIn ? <NoPage /> : <Navigate to="/login" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

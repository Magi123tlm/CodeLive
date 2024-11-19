var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var userModel = require("../models/UserModel.js");
var projectModel = require("../models/ProjectModel.js");

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCond = await userModel.findOne({ email: email });
  if (emailCond) {
    res.json({ success: false, message: "Email already exists" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
          name: name,
          email: email,
          password: hash,
        });
      });
    });
  }
  res.status(201).json({ success: true, message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, resp) {
      if (resp) {
        let token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          success: true,
          message: "User Logged In Successfully",
          token: token,
          userId: user._id,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: "Invalid email or password" });
      }
    });
  } else {
    res.status(422).json({ success: false, message: "User Does Not Exist" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({
      success: true,
      message: "User Details fetched successfully",
      user: user,
    });
  } else {
    return res.json({ success: false, message: " User not found!" });
  }
});

router.post("/createProject", async (req, res) => {
  const { userId, title } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.create({
      title: title,
      createdBy: userId,
    });
    return res.json({
      success: true,
      message: "Project created successfully",
      projectId: project._id,
    });
  } else {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
});

router.post("/getProjects", async (req, res) => {
  const { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let projects = await projectModel.find({
      createdBy: userId,
    });
    return res.json({
      success: true,
      message: "Project created successfully",
      projects: projects,
    });
  } else {
    return res.json({
      success: false,
      message: "Project not found!",
    });
  }
});

router.delete("/deleteProject", async (req, res) => {
  let { userId, projectId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndDelete({ _id: projectId });
    return res.json({ success: true, message: "Project Deleted Successfully" });
  } else {
    return res.json({ success: false, message: "User does not exist" });
  }
});

router.post("/getProject", async (req, res) => {
  let { userId, projectId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projectId });
    console.log(project);
    return res.json({
      success: true,
      message: "Project Fetched Successfully",
      project: project,
    });
  } else {
    return res.json({ success: false, message: "User Not Found!" });
  }
});

router.post("/updateProject", async (req, res) => {
  let { userId, projectId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projectId },
      { htmlCode, cssCode, jsCode }
    );
    return res.json({ success: true, message: "Project updated successfully" });
  } else {
    return res.json({ success: false, message: "User Not Found!" });
  }
});

module.exports = router;

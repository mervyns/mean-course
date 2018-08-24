const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("../models/post");

const app = express();

mongoose
  .connect("mongodb://user:password00@ds131942.mlab.com:31942/mean-course")
  .then(() => {
    console.log("connected to mongoDB server");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "Post added successfully"
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "234jhr2fh",
      title: "first server post",
      content: "this is from the server"
    },
    {
      id: "234jhr2fh",
      title: "second server post",
      content: "this is from the server"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts
  });
});

module.exports = app;

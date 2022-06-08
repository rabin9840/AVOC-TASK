const express = require("express");

const video = require("../routes/video");
const videolist = require("../routes/videoList");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api", video);
  app.use("/api", videolist);

};

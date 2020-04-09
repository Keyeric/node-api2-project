const express = require("express");

const postRoutes = require("./data/apiPosts/postsRoutes");

const server = express(); //server starts
const port = process.env.PORT || 8000;

server.use(express.json());

server.use("/api/posts", postRoutes); //router

server.use("/", (req, res) => {
  //server _route_
  res.status(418).send(`Server is running`);
});

server.listen(port, () => console.log(`Server listening on port ${port}`)); //Go button

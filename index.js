const express = require("express");

const postRoutes = require("./data/apiPosts/postsRoutes");

const server = express();
const port = 8000;

server.use(express.json());
server.use("/api/posts", postRoutes);

server.use("/", (req, res) => {
  res.status(418).send(`Server is running`);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));

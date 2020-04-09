const express = require("express");

const router = express.Router();
const posts = require("../db");

//Start POST Requests

//When the client makes a request to `/api/posts`:
router.post("/", (req, res) => {
  const body = req.body;

  posts
    .insert(body)
    .then((post) => {
      if (body.title && body.contents) {
        res.status(201).json(post);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//When the client makes a request to `/api/posts/:id/comments`:
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  body.post_id = id;

  posts
    .findById(id)
    .then((idPost) => {
      console.log(idPost);
      if (idPost.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
      posts
        .insertComment(body)
        .then(() => {
          if (body.text) {
            res.status(201).json(body);
          } else {
            res
              .status(400)
              .json({ errorMessage: "Please provide text for the comment." });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error:
              "There was an error while saving the comment to the database",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while retrieving the post from the database",
      });
    });
});
// End POST Requests

//Start GET Requests

//When the client makes a request to `/api/posts`:
router.get("/", (req, res) => {
  const query = req.query;

  posts
    .find(query)
    .then((postsFromDataBase) => {
      res.status(200).json(postsFromDataBase);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//When the client makes a request to `/api/posts/:id`:
router.get("/:id", (req, res) => {
  const id = req.params.id;

  posts
    .findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//When the client makes a request to `/api/posts/:id/comments`:
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  posts
    .findPostComments(id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});
//End GET Requests

//Start DELETE Requests

//When the client makes a request to `/api/posts/:id`:
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  posts.remove(id).then((bye) => {
    if (bye) {
      res.status(200).json({ message: "Post Deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
});
//End DELETE Requests

//Start PUT Requests

//When the client makes a request to `/api/posts/:id`:
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  posts
    .update(id, body)
    .then((words) => {
      console.log(body);
      if (words === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else if (body.title && body.contents) {
        res.status(200).json(body);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The post information could not be modified." });
    });
});

//End PUT Requests

module.exports = router;

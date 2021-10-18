var express = require("express");
var router = express.Router();

const { jwtMiddleware } = require("../users/lib/authMiddleware");
const {
  createPost,
  getAllPost,
  deletePostByID,
  updatePostByID,
} = require("./controller/postController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "post router" });
});

router.post("/create-post", jwtMiddleware, createPost);
router.get("/get-all-post", getAllPost);
router.delete("/delete-post-by-id/:id", jwtMiddleware, deletePostByID);
router.put("/update-post-by-id/:id", jwtMiddleware, updatePostByID);

module.exports = router;

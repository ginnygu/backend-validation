var express = require("express");
var router = express.Router();

const { jwtMiddleware } = require("../users/lib/authMiddleware");
const {
  createComment,
  getAllUserComment,
  deleteCommentById,
  updateCommentById,
} = require("./controller/commentController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "comment" });
});

router.get("/get-all-comment-from-user", jwtMiddleware, getAllUserComment);

router.post("/create-comment-by-post-id/:id", jwtMiddleware, createComment);

router.delete("/delete-comment-by-id/:id", jwtMiddleware, deleteCommentById);
router.put("/update-comment-by-id/:id", jwtMiddleware, updateCommentById);

module.exports = router;

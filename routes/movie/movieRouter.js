var express = require("express");
var router = express.Router();

const { jwtMiddleware } = require("../users/lib/authMiddleware");
const {
  addFavoriteMovie,
  fetchFavoriteMovies,
  deleteMovieByID,
} = require("./controller/movieController");
/* GET home page. */

router.get("/get-favorites-movies", jwtMiddleware, fetchFavoriteMovies);
router.post("/add-favorite-movie", jwtMiddleware, addFavoriteMovie);
router.delete("/delete-by-id/:id", jwtMiddleware, deleteMovieByID);

module.exports = router;

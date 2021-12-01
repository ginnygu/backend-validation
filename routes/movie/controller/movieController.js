const Movie = require("../model/Movie");
const User = require("../../users/model/User");
const errorHandler = require("../../utils/errorHandler/errorHandler");

async function addFavoriteMovie(req, res) {
  try {
    const decodedData = res.locals.decodedData;

    let foundUser = await User.findOne({ email: decodedData.email });

    let createdMovie = new Movie({
      title: req.body.title,
      poster: req.body.poster,
      rating: req.body.rating,
      user: foundUser._id,
    });

    let savedMovie = await createdMovie.save();

    foundUser.favoriteMovies.push(savedMovie._id);
    await foundUser.save();

    res.json({ message: "success", payload: savedMovie });
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

async function fetchFavoriteMovies(req, res) {
  try {
    const decodedData = res.locals.decodedData;

    let foundUser = await User.findOne({ email: decodedData.email });

    let foundFavoriteMovies = await Movie.find({ user: foundUser._id });

    res.json({ message: "success", payload: foundFavoriteMovies });
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

async function deleteMovieByID(req, res) {
  try {
    let deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    const decodedData = res.locals.decodedData;

    let foundUser = await User.findOne({ email: decodedData.email });

    let userFavoriteMovieArray = foundUser.favoriteMovies;

    let filteredArray = userFavoriteMovieArray.filter(
      (item) => item._id.toString() !== req.params.id
    );

    foundUser.favoriteMovies = filteredArray;

    await foundUser.save();

    res.json({ message: "success", payload: deletedMovie });
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

module.exports = {
  addFavoriteMovie,
  fetchFavoriteMovies,
  deleteMovieByID,
};

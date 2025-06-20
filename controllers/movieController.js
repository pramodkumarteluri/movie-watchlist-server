const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};

exports.addMovie = async (req, res) => {
  const { title, genre, status } = req.body;

  if (!title || !genre || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const movie = new Movie({
      title,
      genre,
      status,
      userId: req.user.id,
    });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add movie' });
  }
};

exports.updateMovie = async (req, res) => {
  const { title, genre, status } = req.body;

  try {
    const movie = await Movie.findOne({ _id: req.params.id, userId: req.user.id });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.title = title || movie.title;
    movie.genre = genre || movie.genre;
    movie.status = status || movie.status;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update movie' });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete movie' });
  }
};
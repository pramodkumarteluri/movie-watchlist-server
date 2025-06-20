const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');

router.get('/', protect, getMovies);
router.post('/', protect, addMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
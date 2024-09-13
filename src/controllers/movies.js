import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from '../services/movies.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getMoviesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const movies = await getAllMovies({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found movies!',
    data: movies,
  });
};

export const getMoviesByIdController = async (req, res, next) => {
  const { id } = req.params;
  const movie = await getMovieById(id);

  if (!movie) {
    next(createHttpError(404, 'Movie not found'));
  }

  // Відповідь, якщо контакт знайдено
  res.json({
    status: 200,
    message: `Successfully found movie with id ${id}!`,
    data: movie,
  });
};

export const createMovieController = async (req, res) => {
  const movie = await createMovie(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully created a movie!`,
    data: movie,
  });
};

export const deleteMovieController = async (req, res, next) => {
  const { id } = req.params;
  const movie = await deleteMovie(id);

  if (!movie) {
    next(createHttpError(404, 'Movie not found'));
    return;
  }

  res.status(204).send();
};

export const upsertMovieController = async (req, res, next) => {
  const { id } = req.params;

  const result = await updateMovie(id, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Movie not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a movie!',
    data: result.movie,
  });
};

export const patchMovieController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateMovie(id, req.body);

  if (!result) {
    next(createHttpError(404, 'movie not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a movie!',
    data: result.movie,
  });
};

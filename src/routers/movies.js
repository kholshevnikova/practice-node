import { Router } from 'express';

import {
  getMoviesController,
  getMoviesByIdController,
  createMovieController,
  deleteMovieController,
  upsertMovieController,
  patchMovieController,
} from '../controllers/movies.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { movieAddSchema, moviePatchSchema } from '../validations/movies.js';
import isValidId from '../middlewares/isValidId.js';

const router = Router();

router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:id', isValidId, ctrlWrapper(getMoviesByIdController));

router.post(
  '/movies',
  validateBody(movieAddSchema),
  ctrlWrapper(createMovieController),
);

router.delete('/movies/:id', ctrlWrapper(deleteMovieController));

router.put(
  '/movies/:id',
  isValidId,
  validateBody(movieAddSchema),
  ctrlWrapper(upsertMovieController),
);

router.patch(
  '/movies/:id',
  isValidId,
  validateBody(moviePatchSchema),
  ctrlWrapper(patchMovieController),
);

export default router;

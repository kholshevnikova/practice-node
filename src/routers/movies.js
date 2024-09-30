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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:id', isValidId, ctrlWrapper(getMoviesByIdController));

router.post(
  '/movies',
  isValidId,
  upload.single('movie'),
  validateBody(movieAddSchema),
  ctrlWrapper(createMovieController),
);

router.delete('/movies/:id', ctrlWrapper(deleteMovieController));

router.put(
  '/movies/:id',
  isValidId,
  upload.single('movie'),
  validateBody(movieAddSchema),
  ctrlWrapper(upsertMovieController),
);

router.patch(
  '/movies/:id',
  isValidId,
  upload.single('movie'),
  validateBody(moviePatchSchema),
  ctrlWrapper(patchMovieController),
);

router.use(authenticate);
router.get('/movies', ctrlWrapper(getMoviesController));

export default router;

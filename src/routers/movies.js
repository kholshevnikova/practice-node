import { Router } from "express";


import { getMoviesController, getMoviesByIdController, createMovieController, deleteMovieController, upsertMovieController, patchMovieController } from "../controllers/movies.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";



const router = Router();



router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:id', ctrlWrapper(getMoviesByIdController));

router.post('/movies', ctrlWrapper(createMovieController));

router.delete('/movies/:id', ctrlWrapper(deleteMovieController));

router.put('/movies/:id', ctrlWrapper(upsertMovieController));

router.patch('/movies/:id', ctrlWrapper(patchMovieController));


export default router;


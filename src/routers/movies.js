import { Router } from "express";
// import { getAllMovies, getMovieById } from "../services/movies.js";

import { getMoviesController, getMoviesByIdController } from "../controllers/movies.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";



const router = Router();



router.get('/movies', ctrlWrapper(getMoviesController));

router.get('/movies/:id',ctrlWrapper(getMoviesByIdController));


export default router;


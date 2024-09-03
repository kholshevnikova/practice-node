// import { isValidObjectId } from "mongoose";
import { getAllMovies, getMovieById } from "../services/movies.js";
import createHttpError from "http-errors";



export const getMoviesController = async (req, res, next) => {
  const movies = await getAllMovies();

  res.json({
    status: 200,
    message: 'Successfully found movies!',
    data: movies,
  });
};

export const getMoviesByIdController = async (req, res, next) => {
    const { id } = req.params;
  const movie = await getMovieById(id);
   // Перевірка формату ObjectId
    // if (!isValidObjectId(id)) {
    //   return next(createHttpError(400, 'Invalid ID format'));
    // }

    // Відповідь, якщо контакт не знайдено
    // if (!movie) {
    //     res.status(404).json({
    //         message: 'Movie not found'
    //     });
    //     return;
    // }

    if (!movie) {
      // next(new Error('Movie not found'));
      throw createHttpError(404, 'Movie not found');
    }

    // Відповідь, якщо контакт знайдено
    res.json({
        status: 200,
        message: `Successfully found movie with id ${id}!`,
        data: movie,
    });
};

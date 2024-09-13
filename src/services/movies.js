import { SORT_ORDER } from '../constants/movies.js';
import MovieCollection from '../db/models/Movie.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllMovies = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const moviesQuery = MovieCollection.find();
  const moviesCount = await MovieCollection.find()
    .merge(moviesQuery)
    .countDocuments();

  const movies = await moviesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(moviesCount, perPage, page);
  return {
    data: movies,
    ...paginationData,
  };
};

export const getMovieById = (id) => MovieCollection.findById(id);

export const createMovie = async (payload) => {
  const movie = await MovieCollection.create(payload);
  return movie;
};

export const deleteMovie = async (id) => {
  const movie = await MovieCollection.findOneAndDelete({
    _id: id,
  });
  return movie;
};

export const updateMovie = async (id, payload, options = {}) => {
  const rawResult = await MovieCollection.findByIdAndUpdate(id, payload, {
    includeResultMetadata: true,
    ...options,
  });

  console.log(rawResult);

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    movie: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

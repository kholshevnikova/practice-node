import Joi from 'joi';
import { genreList } from '../constants/movies.js';

const maxReleaseYear = new Date().getFullYear();

export const movieAddSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  director: Joi.string().required().messages({
    'any.required': 'director must be exist',
  }),
  genre: Joi.string()
    .valid(...genreList)
    .required(),
  favorite: Joi.boolean(),
  // releaseYear: Joi.string().pattern(releaseYearRegexp).required().messages({
  //   'any.required': 'releaseYear must be',
  // }),
  releaseYear: Joi.number().min(1895).max(maxReleaseYear).required(),
});

export const moviePatchSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  director: Joi.string(),
  genre: Joi.string().valid(...genreList),
  favorite: Joi.boolean(),
  releaseYear: Joi.number().min(1895).max(maxReleaseYear),
});

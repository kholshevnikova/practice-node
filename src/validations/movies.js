import Joi from 'joi';
import { genreList, releaseYearRegexp } from '../constants/movies.js';

export const movieAddSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  director: Joi.string().required().messages({
    'any.required': 'director must be exist',
  }),
  genre: Joi.string()
    .valid(...genreList)
    .required(),
  favorite: Joi.boolean(),
  releaseYear: Joi.string().pattern(releaseYearRegexp).required().messages({
    'any.required': 'releaseYear must be',
  }),
});

export const moviePatchSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  director: Joi.string(),
  genre: Joi.string().valid(...genreList),
  favorite: Joi.boolean(),
  releaseYear: Joi.string(),
});

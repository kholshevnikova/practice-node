import { Schema, model } from 'mongoose';
import { genreList } from '../../constants/movies.js';
import { handleSaveError, setUpdateOptions } from '../models/hooks.js';
const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be exist'],
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: genreList,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    releaseYear: {
      // type: String,
      // match: releaseYearRegexp,
      type: Number,
      min: 1895,
      max: new Date().getFullYear(),
      required: true,
    },
    photo: { type: String },
  },
  { versionKey: false, timestamps: true },
);

movieSchema.post('save', handleSaveError);
movieSchema.post('findOneAndUpdate', handleSaveError);
movieSchema.pre('findOneAndUpdate', setUpdateOptions);
const MovieCollection = model('movie', movieSchema);

export default MovieCollection;

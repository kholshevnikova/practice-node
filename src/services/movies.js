import MovieCollection from '../db/models/Movie.js';

export const getAllMovies = () => MovieCollection.find();

export const getMovieById = id => MovieCollection.findById(id);

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
    const rawResult = await MovieCollection.findByIdAndUpdate(id, payload, {new: true,
      includeResultMetadata: true,  //
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

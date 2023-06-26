import { z } from "zod";
import api from "../utils/fetch";

export const cinemaSchema = z.object({
  id: z.string(),
  name: z.string(),
  movieIds: z.array(z.string()),
});

export type Cinema = z.infer<typeof cinemaSchema>;

export const movieSchema = z.object({
  title: z.string(),
  posterUrl: z.string().url(),
  releaseYear: z.number().int(),
  description: z.string(),
  genre: z.string(),
  id: z.string(),
  rating: z.number(),
  director: z.string(),
  reviewIds: z.array(z.string()),
});

export type Movie = z.infer<typeof movieSchema>;

export const reviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  text: z.string(),
  rating: z.number().min(1).max(10),
});

export type Review = z.infer<typeof reviewSchema>;

export const fetchCinemas = api({
  path: "cinemas",
  responseSchema: z.array(cinemaSchema),
});

export const fetchMovies = api({
  path: "movies",
  searchParams: z.object({
    cinemaId: z.string().optional(),
  }),
  responseSchema: z.array(movieSchema),
});

export const fetchMovie = api({
  path: "movie",
  searchParams: z.object({
    movieId: z.string(),
  }),
  responseSchema: movieSchema,
});

export const fetchMovieReviews = api({
  path: "reviews",
  searchParams: z.object({
    movieId: z.string(),
  }),
  responseSchema: z.array(reviewSchema),
});

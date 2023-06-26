import { Filter, Movies } from "~/app/client-components";
import { fetchCinemas, fetchMovies } from "~/lib/services/cinema";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MovieCounter } from "~/components/MovieCounter";
import type { IMovieCard } from "~/types/movie-card";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cinemaId =
    typeof searchParams?.cinemaId !== "string" ? null : searchParams?.cinemaId;

  const { data: movies, error } = await fetchMovies({
    searchParamsData: cinemaId ? { cinemaId } : {},
  });
  const { data: cinemas, error: cinemaError } = await fetchCinemas({});

  if (error || cinemaError) {
    notFound();
  }

  const genres = movies
    .map((movie) => movie.genre)
    .filter((value, index, array) => array.indexOf(value) === index);

  return (
    <main className="flex gap-6 overflow-auto">
      <Filter cinemas={cinemas} genres={genres} />
      <Movies moviesData={movies} />
    </main>
  );
}

export const MovieCard = ({
  movie,
  warn,
}: {
  movie: IMovieCard;
  warn?: boolean;
}) => {
  return (
    <div className="relative flex gap-6 p-6 bg-white rounded-lg hover:bg-white-tertiary">
      <Link href={`film/${movie.id}`} className="flex gap-6 grow">
        <Image
          src={movie.posterUrl}
          alt="film_thumbnail"
          width={100}
          height={120}
        />
        <div className="relative flex flex-col gap-2 grow">
          <h6 className="text-xl font-semibold">{movie.title}</h6>
          <p className="italic">{movie.genre}</p>
        </div>
      </Link>
      <MovieCounter movie={movie} warn={warn} />
    </div>
  );
};

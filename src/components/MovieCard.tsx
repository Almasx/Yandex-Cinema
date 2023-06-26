import Image from "next/image";
import Link from "next/link";
import { IMovieCard } from "~/types/movie-card";
import { MovieCounter } from "./MovieCounter";

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

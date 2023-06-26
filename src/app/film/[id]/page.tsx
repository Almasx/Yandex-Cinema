import { fetchMovie, fetchMovieReviews } from "~/lib/services/cinema";

import Image from "next/image";
import { MovieCounter } from "~/components/MovieCounter";
import Review from "~/components/Review";

export default async function Film({ params }: { params: { id: string } }) {
  const { data: movie, error: movieError } = await fetchMovie({
    searchParamsData: { movieId: params.id },
  });

  const { data: reviews, error: reviewsError } = await fetchMovieReviews({
    searchParamsData: { movieId: params.id },
  });

  if (reviewsError || movieError) {
    return (
      <div className="flex items-center justify-center text-4xl text-gray-3 font-bold h-[calc(100vh-228px)]">
        Такого фильма нету
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-xl leading-6">
      <div className="relative flex gap-8 p-6 bg-white rounded-lg">
        <Image
          height={500}
          width={400}
          src={movie.posterUrl}
          alt="film_image"
          className="rounded-lg"
        />
        <div className="flex flex-col gap-6 grow">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-semibold">{movie.title}</h1>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <span className="font-semibold">Жанр: </span>
                {movie.genre}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Год выпуска: </span>
                {movie.releaseYear}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Рейтинг: </span>
                {movie.rating}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Режиссер: </span>
                {movie.director}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold leading-8">Описание</h4>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>

        <MovieCounter movie={movie} />
      </div>

      {...reviews.map((review) => <Review {...review} key={review.id} />)}
    </div>
  );
}

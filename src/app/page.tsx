import { Filter, Movies } from "~/app/client-components";
import { fetchCinemas, fetchMovies } from "~/lib/services/cinema";

import { notFound } from "next/navigation";

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

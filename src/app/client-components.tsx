"use client";

import { Cinema, Movie } from "~/lib/services/cinema";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { MovieCard } from "~/components/MovieCard";
import { Select } from "~/components/primitives/select";
import { TextField } from "~/components/primitives/text-field";
import { useCartStore } from "~/lib/hooks/useCartStore";
import useDebounce from "~/lib/hooks/useDebounce";
import { useFilterStore } from "~/lib/hooks/useFilterStore";

type FilterProps = {
  cinemas: Cinema[];
  genres: string[];
};

export const Filter = ({ cinemas, genres }: FilterProps) => {
  const router = useRouter();
  const { setGenre, setQuery } = useFilterStore(
    (state) => ({ setGenre: state.setGenre, setQuery: state.setQuery }),
    shallow
  );

  const debounce = useDebounce();

  return (
    <aside className="sticky self-start p-6 bg-white rounded-lg h-[calc(100vh-228px)]">
      <div className="flex flex-col gap-5 w-[360px]">
        <h3 className="text-xl font-semibold">Фильтр поиска</h3>
        <TextField
          label="Название"
          placeholder="Введите название"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            debounce(() => setQuery(event.target.value));
          }}
        />
        <Select.Root
          label="Жанр"
          placeholder="Выберите жанр"
          options={genres.map((genre) => (
            <Select.Option
              label={genre}
              onClick={() => {
                setGenre(genre);
              }}
              key={genre}
            />
          ))}
          onDefault={() => setGenre(null)}
        />
        <Select.Root
          label="Кинотеатр"
          placeholder="Выберите кинотеатр"
          onDefault={() => router.push(`/`)}
          options={cinemas.map((cinema) => (
            <Select.Option
              label={cinema.name}
              onClick={() => router.push(`/?cinemaId=${cinema.id}`)}
              key={cinema.id}
            />
          ))}
        />
      </div>
    </aside>
  );
};

export const Movies = ({ moviesData }: { moviesData: Movie[] }) => {
  const { genre, query } = useFilterStore(
    (state) => ({ genre: state.filter.genre, query: state.filter.query }),
    shallow
  );

  const movies = useMemo(() => {
    return moviesData.filter((movie) => {
      if (genre === null) {
        return movie.title.includes(query);
      }
      return movie.genre === genre && movie.title.includes(query);
    });
  }, [moviesData, genre, query]);

  return (
    <div className="flex flex-col gap-4 grow h-[calc(100vh-228px)] overflow-auto">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export const CartIndicator = () => {
  const total = useCartStore((state) => state.total);

  if (total) {
    return (
      <div className="flex items-center justify-center p-1 rounded-lg bg-orange w-7 h-7 ">
        {total}
      </div>
    );
  }
};

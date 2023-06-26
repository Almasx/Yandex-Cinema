"use client";

import { useCartStore } from "~/lib/hooks/useCartStore";
import { MovieCard } from "../page";

export default function Cart() {
  const { cart, total } = useCartStore((state) => state);

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center text-4xl text-gray-3 font-bold h-[calc(100vh-228px)]">
        Тут пока пусто...
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-228px)]">
      <main className="flex flex-col gap-4">
        {cart.map((cartMovie) => (
          <MovieCard
            movie={cartMovie.movie}
            warn={true}
            key={cartMovie.movie.id}
          />
        ))}
      </main>
      <div className="flex justify-between p-6 font-semibold bg-white rounded-lg">
        <span>Итого билетов:</span>
        {total}
      </div>
    </div>
  );
}

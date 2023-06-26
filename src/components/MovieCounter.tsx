"use client";

import Image from "next/image";
import Cross from "public/icons/close.svg";
import Minus from "public/icons/minus.svg";
import Plus from "public/icons/plus.svg";
import { useState } from "react";
import { useCartStore } from "~/lib/hooks/useCartStore";
import { IMovieCard } from "~/types/movie-card";
import { MiniButton } from "./primitives/button";
import { Modal } from "./primitives/modal";

export const MovieCounter = ({
  movie,
  warn,
}: {
  movie: IMovieCard;
  warn?: boolean;
}) => {
  const { cart, addMovie, removeMovie, totalRemoveMovie } = useCartStore(
    (state) => state
  );
  const movieInCart = cart.find((cartMovie) => cartMovie.movie.id === movie.id);
  const [warnShow, setWarnShow] = useState<boolean>(false);

  return (
    <div className="absolute z-10 flex items-center gap-6 top-6 right-6">
      <div className="flex items-center gap-2 text-xl font-semibold ">
        <MiniButton
          onClick={() => removeMovie(movie, () => setWarnShow(true))}
          disabled={!movieInCart?.quantity}
        >
          <Image src={Minus} alt="minus" width={20} height={20} />
        </MiniButton>
        {movieInCart?.quantity ?? 0}
        <MiniButton
          onClick={() => addMovie(movie)}
          disabled={movieInCart?.quantity === 30}
        >
          <Image src={Plus} alt="plus" width={20} height={20} />
        </MiniButton>
      </div>
      {!!warn && (
        <button onClick={() => setWarnShow(true)}>
          <Image src={Cross} alt="cross" />
        </button>
      )}
      {warn && warnShow && (
        <Modal.Root visible={warnShow} setVisible={setWarnShow}>
          <Modal.Dialog
            label="Удаление билета"
            description="Вы уверены, что хотите удалить билет?"
            onCancel={() => setWarnShow(false)}
            onConfirm={() => totalRemoveMovie(movie)}
          />
        </Modal.Root>
      )}
    </div>
  );
};

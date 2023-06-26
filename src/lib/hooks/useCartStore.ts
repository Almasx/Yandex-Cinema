import { create } from "zustand";
import { MovieCard } from "~/app/page";

interface CartState {
  cart: { movie: MovieCard; quantity: number }[];
  total: number;
  addMovie: (movie: MovieCard) => void;
  removeMovie: (movie: MovieCard, onTotalRemove?: () => void) => void;
  totalRemoveMovie: (movie: MovieCard) => void;
  resetCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  total: 0,
  addMovie: (movie: MovieCard) =>
    set((state) => {
      const movieInCart = state.cart.findIndex(
        (cartMovie) => cartMovie.movie.id === movie.id
      );

      if (movieInCart !== -1) {
        return {
          total: state.total + 1,
          cart: [
            ...state.cart.filter(
              (cartMovie) => cartMovie.movie.id !== movie.id
            ),
            { movie, quantity: state.cart[movieInCart]!.quantity + 1 },
          ],
        };
      }

      return {
        total: state.total + 1,
        cart: [...state.cart, { movie, quantity: 1 }],
      };
    }),

  removeMovie: (movie: MovieCard, onTotalRemove?: () => void) =>
    set((state) => {
      const movieInCart = state.cart.findIndex(
        (cartMovie) => cartMovie.movie.id === movie.id
      );
      if (movieInCart !== -1) {
        if (state.cart[movieInCart]!.quantity === 1) {
          if (onTotalRemove) {
            onTotalRemove();
            return state;
          }
          return {
            total: state.total - 1,
            cart: state.cart.filter(
              (cartMovie) => cartMovie.movie.id !== movie.id
            ),
          };
        }
        return {
          total: state.total - 1,
          cart: [
            ...state.cart.filter(
              (cartMovie) => cartMovie.movie.id !== movie.id
            ),
            { movie, quantity: state.cart[movieInCart]!.quantity - 1 },
          ],
        };
      }

      return state;
    }),

  totalRemoveMovie: (movie: MovieCard) =>
    set((state) => {
      const movieInCart = state.cart.find(
        (cartMovie) => cartMovie.movie.id === movie.id
      );

      if (movieInCart) {
        return {
          total: state.total - movieInCart?.quantity,
          cart: state.cart.filter(
            (cartMovie) => cartMovie.movie.id !== movie.id
          ),
        };
      }

      return state;
    }),

  resetCart: () =>
    set(() => ({
      cart: [],
      total: 0,
    })),
}));

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { useSelectedGenre } from "../hooks/useSelectedGenre";

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

// Formato do Provider
interface MoviesProviderProps {
  children: ReactNode;
}

// Formato do Contexto
interface MoviesContextData {
  movies: MovieProps[];
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenreId } = useSelectedGenre();

  // REVIEW
  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  return context;
}

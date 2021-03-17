import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

// Formato do Provider
interface GenresProviderProps {
  children: ReactNode;
}

// Formato do Contexto
interface GenresContextData {
  genres: Genre[];
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData);

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      console.log("genres:", response.data);
      setGenres(response.data);
    });
  }, []);

  return (
    <GenresContext.Provider value={{ genres }}>
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  const context = useContext(GenresContext);
  return context;
}

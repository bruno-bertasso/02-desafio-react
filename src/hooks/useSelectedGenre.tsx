import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

// Formato do Provider
interface SelectedGenreProviderProps {
  children: ReactNode;
}

// Formato do Contexto
interface SelectedGenreContextData {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  handleSelectGenre: (id: number) => void;
}

const SelectedGenreContext = createContext<SelectedGenreContextData>(
  {} as SelectedGenreContextData
);

export function SelectedGenreProvider({
  children,
}: SelectedGenreProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  // REVIEW
  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleSelectGenre(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <SelectedGenreContext.Provider
      value={{ selectedGenreId, selectedGenre, handleSelectGenre }}
    >
      {children}
    </SelectedGenreContext.Provider>
  );
}

// hook apenas exporta contexto
export function useSelectedGenre() {
  const context = useContext(SelectedGenreContext);
  return context;
}

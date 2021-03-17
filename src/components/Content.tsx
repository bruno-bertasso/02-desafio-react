import { useMovies } from "../hooks/useMovies";
import { useSelectedGenre } from "../hooks/useSelectedGenre";
import { MovieCard } from "./MovieCard";

export function Content() {
  const { selectedGenre } = useSelectedGenre();
  const { movies } = useMovies();

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

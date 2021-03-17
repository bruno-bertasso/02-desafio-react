import { useGenres } from "../hooks/useGenres";
import { useSelectedGenre } from "../hooks/useSelectedGenre";
import { Button } from "./Button";

export function SideBar() {
  const { genres } = useGenres();
  const { handleSelectGenre, selectedGenreId } = useSelectedGenre();

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

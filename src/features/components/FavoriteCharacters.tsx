import { CharacterDTO } from "./../dtos/CharacterDTO";
import ActionAreaCard from "./ActionAreaCard";
import "./../../App.css";

interface FavoriteCharactersProps {
  favorites: CharacterDTO[];
  toggleFavorite: (id: number) => void;
}

export default function FavoriteCharacters({
  favorites,
  toggleFavorite,
}: FavoriteCharactersProps) {
  return (
    <div className="characters-container">
      <div className="card-container">
        {favorites.length === 0 ? (
          <p>No favorite characters yet.</p>
        ) : (
          favorites.map((character) => (
            <ActionAreaCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              image={character.image}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}

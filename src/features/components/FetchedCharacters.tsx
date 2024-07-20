import { useState } from "react";
import "./../../App.css";
import ActionAreaCard from "./ActionAreaCard";
import { Bars } from "react-loader-spinner";
import { CharacterDTO } from "../dtos/CharacterDTO";
import SearchBar from "./SearchBar";
import { fetchCharacters } from "./../../api/apiService";
import { useQuery } from "@tanstack/react-query";

interface FetchedCharactersProps {
  search: string;
  setSearch: (value: string) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export default function FetchedCharacters({
  search,
  setSearch,
  favorites,
  toggleFavorite,
}: FetchedCharactersProps) {
  const [page, setPage] = useState(1);

  const { data: characters, isLoading } = useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => fetchCharacters(page, search),
  });

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < characters?.pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="characters-container">
      <SearchBar search={search} setSearch={setSearch} />

      {isLoading ? (
        <div className="loading-container">
          <Bars height="80" width="80" color="#1976d2" ariaLabel="loading" />
        </div>
      ) : (
        <div className="card-container">
          {characters?.results?.map((character: CharacterDTO) => (
            <ActionAreaCard
              key={character.id}
              id={character.id}
              name={character.name}
              status={character.status}
              image={character.image}
              isFavorite={favorites.includes(character.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      <div className="page-controls">
        <button
          className="single-control"
          onClick={goToPreviousPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="single-control">
          Page {page} of {characters?.pages}
        </span>
        <button
          className="single-control"
          onClick={goToNextPage}
          disabled={page === characters?.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

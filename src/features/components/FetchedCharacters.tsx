import { useEffect, useState } from "react";
import "./../../App.css";
import ActionAreaCard from "./ActionAreaCard";
import { Bars } from "react-loader-spinner";
import { CharacterDTO } from "../dtos/CharacterDTO";
import SearchBar from "./SearchBar";
import { fetchCharacters, searchCharacters } from "./../../api/apiService";

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
  const [characters, setCharacters] = useState<CharacterDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredCharacters, setFilteredCharacters] = useState<CharacterDTO[]>(
    []
  );
  // const [search, setSearch] = useState("");

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        const data = search
          ? await searchCharacters(search, page)
          : await fetchCharacters(page);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setLoading(false);
      }
    };
    getCharacters();
  }, [page, search]);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [characters, search]);

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Bars height="80" width="80" color="#1976d2" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="characters-container">
      <SearchBar search={search} setSearch={setSearch} />{" "}
      <div className="card-container">
        {filteredCharacters.map((character) => (
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
      <div className="page-controls">
        <button
          className="single-control"
          onClick={goToPreviousPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="single-control">
          Page {page} of {totalPages}
        </span>
        <button
          className="single-control"
          onClick={goToNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

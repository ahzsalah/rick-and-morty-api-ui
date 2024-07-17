import "./App.css";
import DefaultAppBar from "./features/components/DefaultAppBar";
// import DummyCards from "./features/components/DummyCards";
import FetchedCharacters from "./features/components/FetchedCharacters";
import Home from "./features/components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleCharacter from "./features/components/SingleCharacter";
import { useEffect, useState } from "react";
import FavoriteCharacters from "./features/components/FavoriteCharacters";
import { CharacterDTO } from "./features/dtos/CharacterDTO";
import { fetchAllCharacters } from "./api/apiService";

function App() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [characters, setCharacters] = useState<CharacterDTO[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchAllCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    getCharacters();
  }, []);

  const toggleFavorite = (id: number) => {
    console.log("Toggling favorite for ID:", id);
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
    // console.log(favorites);
  };

  const favoriteCharacters = characters.filter((character) =>
    favorites.includes(character.id)
  );

  return (
    <Router>
      <div className="container">
        <DefaultAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={
              <FetchedCharacters
                search={search}
                setSearch={setSearch}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />{" "}
          <Route path="/character/:id" element={<SingleCharacter />} />
          <Route
            path="/favorites"
            element={
              <FavoriteCharacters
                favorites={favoriteCharacters}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

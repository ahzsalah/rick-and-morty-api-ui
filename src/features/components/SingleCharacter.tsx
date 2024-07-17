import "./../../App.css";
import { CharacterDTO } from "../dtos/CharacterDTO";
import { Bars } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleCharacter() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterDTO>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Bars height="80" width="80" color="#1976d2" ariaLabel="loading" />
      </div>
    );
  }

  if (!character) {
    return <div>Error loading character details</div>;
  }

  return (
    <div className="character-details">
      <div>
        <img
          className="card-image character-content"
          src={character.image}
          alt={character.name}
        />
      </div>
      <div className="character-content character-text">
        <div>
          <h1 className="character-header">{character.name}</h1>
        </div>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
}

import { CharacterDTO } from "./../features/dtos/CharacterDTO";

const API_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (
  page: number
): Promise<{ results: CharacterDTO[]; info: { pages: number } }> => {
  const response = await fetch(`${API_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  return response.json();
};

export const fetchCharacterById = async (id: string): Promise<CharacterDTO> => {
  const response = await fetch(`${API_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character with id ${id}`);
  }
  return response.json();
};

export const searchCharacters = async (
  query: string,
  page: number
): Promise<{ results: CharacterDTO[]; info: { pages: number } }> => {
  const response = await fetch(
    `${API_URL}/character?page=${page}&name=${query}`
  );
  if (!response.ok) {
    throw new Error("Failed to search characters");
  }
  return response.json();
};

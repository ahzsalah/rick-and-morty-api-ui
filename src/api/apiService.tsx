import { CharacterDTO } from "./../features/dtos/CharacterDTO";
import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (
  page: number,
  searchQuery: string = ""
) => {
  const response = await axios.get(`${API_URL}/character?page=${page}`, {
    params: { page, name: searchQuery },
  });
  return response.data;
};

// export const fetchCharacters = async (
//   page: number
// ): Promise<{ results: CharacterDTO[]; info: { pages: number } }> => {
//   const response = await fetch(`${API_URL}/character?page=${page}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch characters");
//   }
//   return response.json();
// };

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

export const fetchAllCharacters = async (): Promise<CharacterDTO[]> => {
  let characters: CharacterDTO[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await fetchCharacters(page);
    characters = [...characters, ...response.results];
    totalPages = response.info.pages;
    page += 1;
  }

  return characters;
};

import axios from "axios";

export type Pokemon = {
  abilities: [];
  baseExperience: number;
  cries: {};
  forms: [];
  gameIndices: [];
  height: number;
  heldItems: [];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: [];
  name: string;
  order: number;
  species: {};
  sprites: {};
  stats: [];
  types: [];
  weight: number;
};

export type PokemonList = {
  count: number;
  results: { name: string; url: string }[];
};

class PokeAPI {
  private baseURL: string;
  private cache: Map<string, any>;

  constructor(baseURL = "https://pokeapi.co/api/v2/") {
    this.baseURL = baseURL;
    this.cache = new Map();
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    if (this.cache.has(endpoint)) {
      return this.cache.get(endpoint);
    }

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`);
      this.cache.set(endpoint, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }
  }

  // Get a Pokémon by name or ID
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return await this.fetch<Pokemon>(`pokemon/${nameOrId}`);
  }

  // List Pokémon with pagination
  async listPokemon(limit = 20, offset = 0): Promise<PokemonList> {
    return await this.fetch<PokemonList>(
      `pokemon?limit=${limit}&offset=${offset}`
    );
  }
}

export default PokeAPI;

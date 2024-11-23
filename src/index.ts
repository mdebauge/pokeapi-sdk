export { default as PokeAPI } from "./PokeAPI";
export type { Pokemon, PokemonList } from "./PokeAPI";
export {
  PokemonProvider,
  PokemonContext,
  usePokemon,
  usePokemonList,
  useGeneration,
} from "./contexts/PokemonProvider";

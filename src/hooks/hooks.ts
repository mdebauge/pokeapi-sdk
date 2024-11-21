import { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../contexts/PokemonProvider";
import type { Pokemon, PokemonList } from "../PokeAPI";

export function usePokemon(nameOrId: string | number) {
  const context = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  useEffect(() => {
    context
      .getPokemon(nameOrId)
      .then(setPokemon)
      .catch(() => setPokemon(null));
  }, [nameOrId, context.getPokemon]);

  return {
    pokemon,
    loading: context.loading,
    error: context.error,
  };
}

export function usePokemonList(limit?: number, offset?: number) {
  const context = useContext(PokemonContext);
  const [pokemonList, setPokemonList] = useState<PokemonList | null>(null);

  if (!context) {
    throw new Error("usePokemonList must be used within a PokemonProvider");
  }

  useEffect(() => {
    context
      .listPokemon(limit, offset)
      .then(setPokemonList)
      .catch(() => setPokemonList(null));
  }, [limit, offset, context.listPokemon]);

  return {
    pokemonList,
    loading: context.loading,
    error: context.error,
  };
}

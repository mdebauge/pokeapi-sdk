"use client";

import React from "react";
import PokeAPI, { Pokemon, PokemonList } from "../PokeAPI";

type PokemonContextType = {
  getPokemon: (nameOrId: string | number) => Promise<Pokemon>;
  listPokemon: (limit?: number, offset?: number) => Promise<PokemonList>;
  loading: boolean;
  error: Error | null;
};

export const PokemonContext = React.createContext<
  PokemonContextType | undefined
>(undefined);

if (typeof window !== "undefined") {
  PokemonContext.displayName = "PokemonContext";
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const api = new PokeAPI();

  const getPokemon = React.useCallback(async (nameOrId: string | number) => {
    try {
      setLoading(true);
      setError(null);
      return await api.getPokemon(nameOrId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listPokemon = React.useCallback(
    async (limit?: number, offset?: number) => {
      try {
        setLoading(true);
        setError(null);
        return await api.listPokemon(limit, offset);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <PokemonContext.Provider
      value={{ getPokemon, listPokemon, loading, error }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

// Custom hooks
export function usePokemon(nameOrId: string | number) {
  const context = React.useContext(PokemonContext);
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  React.useEffect(() => {
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
  const context = React.useContext(PokemonContext);
  const [pokemonList, setPokemonList] = React.useState<PokemonList | null>(
    null
  );

  if (!context) {
    throw new Error("usePokemonList must be used within a PokemonProvider");
  }

  React.useEffect(() => {
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
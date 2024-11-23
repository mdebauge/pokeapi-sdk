"use client";

import { usePokemon } from "pokeapi-sdk";

export default function Home() {
  const {
    pokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemon("pikachu");
  return (
    <div className="pt-6 px-8">
      <p className="text-xs uppercase font-bold mb-2 mt-2 text-rose-400">
        Overview
      </p>
      <h1 className="text-3xl font-bold">Introduction</h1>
      <p className="mt-4">
        This is a simple TypeScript client for fetching Pokemon data from the
        PokeAPI. It&apos;s designed to be used in Next.js projects.
      </p>{" "}
      {pokemonLoading && <p>Loading...</p>}
      {pokemonError && <p>Error: {pokemonError.message}</p>}
      {pokemon && <p>Loaded Pokemon: {pokemon.name}</p>}
    </div>
  );
}

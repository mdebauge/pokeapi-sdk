[**pokeapi-sdk**](../README.md) • **Docs**

***

[pokeapi-sdk](../README.md) / PokemonContextType

# Type Alias: PokemonContextType

> **PokemonContextType**: `object`

## Type declaration

### error

> **error**: `Error` \| `null`

### getGeneration()

> **getGeneration**: (`nameOrId`) => `Promise`\<[`Generation`](Generation.md)\>

#### Parameters

• **nameOrId**: `string` \| `number`

#### Returns

`Promise`\<[`Generation`](Generation.md)\>

### getPokemon()

> **getPokemon**: (`nameOrId`) => `Promise`\<[`Pokemon`](Pokemon.md)\>

#### Parameters

• **nameOrId**: `string` \| `number`

#### Returns

`Promise`\<[`Pokemon`](Pokemon.md)\>

### listPokemon()

> **listPokemon**: (`limit`?, `offset`?) => `Promise`\<[`PokemonList`](PokemonList.md)\>

#### Parameters

• **limit?**: `number`

• **offset?**: `number`

#### Returns

`Promise`\<[`PokemonList`](PokemonList.md)\>

### loading

> **loading**: `boolean`

## Defined in

[contexts/PokemonProvider.tsx:6](https://github.com/mdebauge/pokeapi-sdk/blob/9cfad3b7316a4e43eb21ffb702cd52dff4b5c565/src/contexts/PokemonProvider.tsx#L6)

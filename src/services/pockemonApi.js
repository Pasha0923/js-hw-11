async function fetchPokemon(pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export { fetchPokemon }; // named export

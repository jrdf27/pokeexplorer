
const API_URL = "https://pokeapi.co/api/v2";

function checkResponse(res) {
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Pokémon no encontrado");
    }

    throw new Error("Error al consultar PokéAPI");
  }

  return res.json();
}

export function getPokemon(name) {
  return fetch(
    `${API_URL}/pokemon/${encodeURIComponent(name)}`
  )
    .then(checkResponse)
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export function getInitialPokemon() {
  return fetch(`${API_URL}/pokemon?limit=12&offset=0`)
    .then(checkResponse)
    .then((data) => {
      const requests = data.results.map((pokemon) =>
        getPokemon(pokemon.name)
      );

      return Promise.all(requests);
    })
    .catch((error) => {
      console.error("Error al cargar Pokémon:", error);
      throw error;
    });
}

export function getPokemonByType(type) {
    return fetch(
      `${API_URL}/type/${encodeURIComponent(type)}`
    )
      .then(checkResponse)
      .then((data) => {
        const pokemonList = data.pokemon
          .slice(0, 12)
          .map((item) => item.pokemon.name);
  
        return Promise.all(
          pokemonList.map((name) => getPokemon(name))
        );
      })
      .catch((error) => {
        console.error("Error al filtrar Pokémon:", error);
        throw error;
      });
  }
  


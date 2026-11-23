
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import Footer from "./components/Footer/Footer";
import PokemonModal from "./components/PokemonModal/PokemonModal";
import PokemonFilters from "./components/PokemonFilters/PokemonFilters";

import {
  getPokemon,
  getInitialPokemon,
  getPokemonByType,
} from "./utils/pokemonApi";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    let active = true;

    getInitialPokemon()
      .then((data) => {
        if (active) {
          setPokemons(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  function handleSearch(name) {
    setLoading(true);
    setError("");

    getPokemon(name)
      .then((data) => {
        setPokemons([data]);
      })
      .catch((err) => {
        setPokemons([]);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleReset() {
    setSelectedType("all");
    setLoading(true);
    setError("");

    getInitialPokemon()
      .then((data) => {
        setPokemons(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

function handleFilter(type) {
  setSelectedType(type);
  setLoading(true);
  setError("");

  const request =
    type === "all"
      ? getInitialPokemon()
      : getPokemonByType(type);

  request
    .then((data) => {
      setPokemons(data);
    })
    .catch((err) => {
      setPokemons([]);
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
}


  return (
    <div className="app">
      <Header />

      <main className="main">
        <section className="pokemon">
          <h2 className="pokemon__title">
            Explora los Pokémon
          </h2>

          <p className="pokemon__description">
            Busca tus Pokémon favoritos y descubre
            sus características y habilidades.
          </p>

          <SearchBar
            onSearch={handleSearch}
            onReset={handleReset}
            disabled={loading}
          />
          <PokemonFilters
            selectedType={selectedType}
            onFilter={handleFilter}
            disabled={loading}
          />

          {loading && (
            <p role="status">Cargando Pokémon...</p>
          )}

          {error && (
            <p className="pokemon__error" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="pokemon__grid">
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={setSelectedPokemon}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      {selectedPokemon && (
  <PokemonModal
    pokemon={selectedPokemon}
    onClose={() => setSelectedPokemon(null)}
  />
)}
    </div>
  );
}

export default App;

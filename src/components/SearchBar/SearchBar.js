
import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, onReset, disabled }) {
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(search.trim().toLowerCase());
  }

  function handleReset() {
    setSearch("");
    onReset();
  }

  return (
    <form
      className="pokemon__search"
      onSubmit={handleSubmit}
    >
      <input
        className="pokemon__input"
        type="search"
        placeholder="Buscar Pokémon..."
        aria-label="Buscar Pokémon"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        disabled={disabled}
        required
      />

      <button
        className="pokemon__button"
        type="submit"
        disabled={disabled}
      >
        Buscar
      </button>

      <button
        className="pokemon__button"
        type="button"
        onClick={handleReset}
        disabled={disabled}
      >
        Todos
      </button>
    </form>
  );
}

export default SearchBar;

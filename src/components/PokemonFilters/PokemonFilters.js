
import "./PokemonFilters.css";

const TYPES = [
  { name: "Todos", value: "all" },
  { name: "Fuego", value: "fire" },
  { name: "Agua", value: "water" },
  { name: "Planta", value: "grass" },
  { name: "Eléctrico", value: "electric" },
];

function PokemonFilters({
  selectedType,
  onFilter,
  disabled,
}) {
  return (
    <div className="pokemon-filters">
      <h3 className="pokemon-filters__title">
        Filtrar por tipo
      </h3>

      <div className="pokemon-filters__buttons">
        {TYPES.map((type) => (
          <button
            key={type.value}
            className={`pokemon-filters__button ${
              selectedType === type.value
                ? "pokemon-filters__button_active"
                : ""
            }`}
            type="button"
            onClick={() => onFilter(type.value)}
            disabled={disabled}
            aria-pressed={selectedType === type.value}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokemonFilters;

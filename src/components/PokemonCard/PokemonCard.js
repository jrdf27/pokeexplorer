
import "./PokemonCard.css";

function PokemonCard({ pokemon, onClick }) {
  const image =
    pokemon.sprites.other["official-artwork"]
      .front_default ||
    pokemon.sprites.front_default;

  return (
    <article className="pokemon-card">
      <button
        className="pokemon-card__action"
        type="button"
        onClick={() => onClick(pokemon)}
        aria-label={`Ver detalles de ${pokemon.name}`}
      >
        <img
          className="pokemon-card__image"
          src={image}
          alt=""
        />

        <span className="pokemon-card__number">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <h3 className="pokemon-card__name">
          {pokemon.name}
        </h3>

        <div className="pokemon-card__types">
          {pokemon.types.map((item) => (
            <span
              className="pokemon-card__type"
              key={item.type.name}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </button>
    </article>
  );
}

export default PokemonCard;

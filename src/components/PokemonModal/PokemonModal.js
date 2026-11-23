
import { useEffect, useRef } from "react";
import "./PokemonModal.css";

function PokemonModal({ pokemon, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      // Mantener el foco dentro de la ventana
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
      previousFocus?.focus();
    };
  }, [onClose]);

  const image =
    pokemon.sprites.other["official-artwork"]
      .front_default ||
    pokemon.sprites.front_default;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="modal"
      onMouseDown={handleOverlayClick}
    >
      <section
        className="modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          ref={closeButtonRef}
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
        >
          ×
        </button>

        <h2 className="modal__title" id="modal-title">
          {pokemon.name}
        </h2>

        <img
          className="modal__image"
          src={image}
          alt={pokemon.name}
        />

        <div className="modal__details">
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
        </div>

        <h3>Habilidades</h3>
        <div className="modal__abilities">
          {pokemon.abilities.map((item) => (
            <span
              className="modal__ability"
              key={item.ability.name}
            >
              {item.ability.name}
            </span>
          ))}
        </div>

        <h3>Estadísticas</h3>

        {pokemon.stats.map((item) => (
          <div
            className="modal__stat"
            key={item.stat.name}
          >
            <span>{item.stat.name}</span>

            <progress
              className="modal__progress"
              value={item.base_stat}
              max={Math.max(150, item.base_stat)}
            />

            <span>{item.base_stat}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default PokemonModal;

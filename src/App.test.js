
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getInitialPokemon } from "./utils/pokemonApi";

// Simulamos las funciones de PokeAPI
jest.mock("./utils/pokemonApi", () => ({
  getInitialPokemon: jest.fn(),
  getPokemon: jest.fn(),
  getPokemonByType: jest.fn(),
}));

test("muestra el título principal de PokéExplorer", async () => {
  // Simulamos una respuesta exitosa de PokeAPI
  getInitialPokemon.mockResolvedValue([]);

  // Renderizamos la aplicación
  render(<App />);

  // Comprobamos que aparezca el título
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: /explora los pok[eé]mon/i,
    })
  ).toBeInTheDocument();

  // Esperamos a que termine de cargar
  await waitFor(() => {
    expect(
      screen.queryByRole("status")
    ).not.toBeInTheDocument();
  });
});

import React from "react";
import NotFound from "./NotFound";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

describe("23 - Entrar em uma URL desconhecida exibe a página `Not Found`", () => {
  test("A página deve conter um heading `h2` com o texto `Page requested not found 😭`", () => {
    const { getByText } = renderWithRouter(<NotFound />, { Route: "/erouuu" });
    const textNotFound = getByText("Page requested not found");
    expect(textNotFound.tagName).toBe("H2");
  });
  test("A página deve exibir a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`", () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const textNotFound = getByText("Page requested not found");
    expect(textNotFound.nextSibling.src).toBe(
      "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"
    );
  });
});

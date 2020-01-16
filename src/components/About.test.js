import React from "react";
import About from "./About";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, cleanup } from "@testing-library/react";

describe('21 - A página "About" deve exibir informações sobre a Pokédex', () => {
  test("A página deve conter um heading `h2` com o texto `About Pokédex`", () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const aboutText = getByText("About Pokédex");
    expect(aboutText.tagName).toBe("H2");
  });
  test("A página deve conter dois parágrafos com texto sobre a Pokédex", () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const aboutParagraphs = getByText("About Pokédex");
    expect(aboutParagraphs.nextSibling.childNodes[0].tagName).toBe("P");
    expect(aboutParagraphs.nextSibling.childNodes[1].tagName).toBe("P");
  });
  test("A página deve conter a seguinte imagem de uma Pokédex: `https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`", () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const aboutImage = getByText("About Pokédex").nextSibling.childNodes[2];
    expect(aboutImage.src).toBe(
      "https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"
    );
  });
});

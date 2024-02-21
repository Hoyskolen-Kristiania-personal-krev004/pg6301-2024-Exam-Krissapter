import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../components/application/application";

describe("news application", () => {
  it("renders front page", () => {
    const component = renderer.create(
      <MemoryRouter>
        <Application />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });
});

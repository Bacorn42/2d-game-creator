import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import ListDisplay from "../../../components/shared/ListDisplay";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faAngleDown, faAngleUp);

afterEach(cleanup);

test("Renders ListDisplay", () => {
  const { getByText } = render(
    <ListDisplay
      name={"List"}
      container={[1, 2, 3]}
      getName={(x) => "Item " + x}
      onChange={() => {}}
      onButtonPlus={() => {}}
      onButtonMinus={() => {}}
      onButtonUp={() => {}}
      onButtonDown={() => {}}
    />
  );
  getByText("Item 1");
  getByText("Item 2");
  getByText("Item 3");
});

import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowBar from "../../../components/window/WindowBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWindowClose, faWindowMaximize, faWindowRestore, faFolder);

afterEach(cleanup);

test("Renders WindowBar", () => {
  const { getByText } = render(
    <WindowBar
      id={"folders_graphics"}
      maximized={false}
      changeMaximize={() => {}}
    />
  );
  getByText("Graphics");
});

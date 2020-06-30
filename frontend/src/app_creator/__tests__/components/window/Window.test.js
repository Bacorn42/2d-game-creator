import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  within,
} from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import Window from "../../../components/window/Window";
import * as windowActions from "../../../actions/windowActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWindowClose, faWindowMaximize, faWindowRestore, faFolder);

afterEach(cleanup);

test("Renders Window", () => {
  const { container } = render(<Window id={"folders_graphics"} />, {
    actions: [windowActions.openWindow("folders_graphics")],
  });
  within(container.getElementsByClassName("window-bar")[0]).getByText(
    "Graphics"
  );
});

test("Changes name on input", () => {
  const { container } = render(<Window id={"folders_graphics"} />, {
    actions: [windowActions.openWindow("folders_graphics")],
  });
  fireEvent.change(container.querySelector("input"), {
    target: { value: "New Folder" },
  });
  within(container.getElementsByClassName("window-bar")[0]).getByText(
    "New Folder"
  );
});

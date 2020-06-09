import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowGraphics from "../../../components/window/WindowGraphics";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWindowClose, faWindowMaximize, faWindowRestore, faImage);

afterEach(cleanup);

test("Renders WindowGraphics", () => {
  const { getByText } = render(<WindowGraphics id={"graphics_0"} />, {
    actions: [
      folderActions.createItem("folders_graphics"),
      windowActions.openWindow("graphics_0"),
    ],
  });
  getByText("graphics_0");
});

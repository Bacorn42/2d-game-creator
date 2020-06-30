import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import MainView from "../../../components/main/MainView";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faImage,
  faWindowClose,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFolder, faImage, faWindowClose, faWindowMaximize);

afterEach(cleanup);

test("Renders multiple windows", () => {
  const { getByText } = render(<MainView />, {
    actions: [
      folderActions.createItem("folders_graphics"),
      folderActions.createItem("folders_graphics"),
      folderActions.createItem("folders_graphics"),
      windowActions.openWindow("graphics_0"),
      windowActions.openWindow("graphics_1"),
      windowActions.openWindow("graphics_2"),
    ],
  });
  getByText("graphics_0");
  getByText("graphics_1");
  getByText("graphics_2");
});

import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowFolders from "../../../components/window/WindowFolders";
import * as folderActions from "../../../actions/folderActions";
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

test("Renders WindowFolders", () => {
  const { getByText } = render(<WindowFolders id={"folders_0"} />, {
    actions: [
      folderActions.createFolder("folders_graphics"),
      windowActions.openWindow("folders_0"),
    ],
  });
  getByText("folders_0");
});

import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowScenes from "../../../components/window/WindowScenes";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWindowClose, faWindowMaximize, faWindowRestore, faTv);

afterEach(cleanup);

test("Renders WindowScenes", () => {
  const { getByText } = render(<WindowScenes id={"scenes_0"} />, {
    actions: [
      folderActions.createItem("folders_scenes"),
      windowActions.openWindow("scenes_0"),
    ],
  });
  getByText("scenes_0");
});

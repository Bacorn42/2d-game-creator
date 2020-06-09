import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowFunctions from "../../../components/window/WindowFunctions";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faFileCode,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faFileCode,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown
);

afterEach(cleanup);

test("Renders WindowFunctions", () => {
  const { getByText } = render(<WindowFunctions id={"functions_0"} />, {
    actions: [
      folderActions.createItem("folders_functions"),
      windowActions.openWindow("functions_0"),
    ],
  });
  getByText("functions_0");
});

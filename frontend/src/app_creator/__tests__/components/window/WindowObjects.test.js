import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowObjects from "../../../components/window/WindowObjects";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faCube,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faCube,
  faPlus,
  faMinus,
  faAngleUp,
  faAngleDown
);

afterEach(cleanup);

test("Renders WindowObjects", () => {
  const { getByText } = render(<WindowObjects id={"objects_0"} />, {
    actions: [
      folderActions.createItem("folders_objects"),
      windowActions.openWindow("objects_0"),
    ],
  });
  getByText("objects_0");
});

import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowSceneOrder from "../../../components/window/WindowSceneOrder";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faListOl,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faListOl,
  faAngleUp,
  faAngleDown
);

afterEach(cleanup);

test("Renders WindowSceneOrder", () => {
  const { getAllByText } = render(
    <WindowSceneOrder id={"sceneOrderWindow"} />,
    {
      actions: [windowActions.openWindow("sceneOrderWindow")],
    }
  );
  expect(getAllByText("Scene Order")).toHaveLength(2);
});

test("Displays existing scenes", () => {
  const { getByText } = render(<WindowSceneOrder id={"sceneOrderWindow"} />, {
    actions: [
      folderActions.createItem("folders_scenes"),
      folderActions.createItem("folders_scenes"),
      windowActions.openWindow("sceneOrderWindow"),
    ],
  });
  getByText("scenes_0");
  getByText("scenes_1");
});

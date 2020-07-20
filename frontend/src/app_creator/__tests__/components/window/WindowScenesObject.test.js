import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowScenesObject from "../../../components/window/WindowScenesObject";
import * as folderActions from "../../../actions/folderActions";

afterEach(cleanup);

test("Renders WindowScenesObject", () => {
  const { container } = render(
    <WindowScenesObject left={"0"} top={"0"} objectId={"objects_0"} />,
    {
      actions: [folderActions.createItem("folders_objects")],
    }
  );
  expect(container.getElementsByClassName("scene-object")).toHaveLength(1);
});

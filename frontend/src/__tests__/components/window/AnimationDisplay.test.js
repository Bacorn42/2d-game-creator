import React from "react";
import { render, cleanup, fireEvent } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import AnimationDisplay from "../../../components/window/AnimationDisplay";
import * as folderActions from "../../../actions/folderActions";

afterEach(cleanup);

test("Renders AnimationDisplay", () => {
  const { getByText } = render(<AnimationDisplay id={"animations_0"} />, {
    actions: [
      folderActions.createItem("folders_graphics"),
      folderActions.createAnimation("graphics_0"),
    ],
  });
  getByText("Name:");
});

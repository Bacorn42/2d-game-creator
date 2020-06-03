import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import FolderItem from "../../../components/folder/FolderItem";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/free-solid-svg-icons";

library.add(faImage);

afterEach(cleanup);

test("Renders FolderItem", () => {
  const { getByText } = render(
    <FolderItem id={"graphics_0"} onItemContextMenu={() => {}} />,
    {
      actions: [folderActions.createItem("folders_graphics")],
    }
  );
  getByText("graphics_0");
});

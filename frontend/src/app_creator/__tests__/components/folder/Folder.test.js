import React from "react";
import { render, cleanup, fireEvent } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import Folder from "../../../components/folder/Folder";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFolder, faAngleDown, faAngleRight);

afterEach(cleanup);

test("Renders Folder", () => {
  const { getByText } = render(
    <Folder
      id={"folders_graphics"}
      onItemContextMenu={() => {}}
      onFolderContextMenu={() => {}}
      isRenameable={false}
      drop={() => {}}
    />
  );
  getByText("Graphics");
});

test("Expansion works", () => {
  const { getByText, queryByText } = render(
    <Folder
      id={"folders_graphics"}
      onItemContextMenu={() => {}}
      onFolderContextMenu={() => {}}
      isRenameable={false}
      drop={() => {}}
    />,
    {
      actions: [folderActions.createFolder("folders_graphics")],
    }
  );

  const folder = getByText("Graphics");
  const expansionIcon = folder.getElementsByClassName(
    "folder-expansion-icon"
  )[0];

  fireEvent.click(expansionIcon);
  expect(queryByText("folders_0")).toBeNull();
  fireEvent.click(expansionIcon);
  getByText("folders_0");
});

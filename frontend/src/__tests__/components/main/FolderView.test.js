import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  createEvent,
  within,
} from "../../../testUtils/folderRenderUtil";
import "@testing-library/jest-dom/extend-expect";
import FolderView from "../../../components/main/FolderView";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faAngleDown,
  faAngleRight,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFolder, faAngleDown, faAngleRight, faImage);

afterEach(cleanup);

test("Creating new item", () => {
  const { getByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Item"));
  getByText("graphics_0");
});

test("Expansion works", () => {
  const { getByText, queryByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Item"));

  const folder = getByText("Graphics");
  const expansionIcon = folder.getElementsByClassName(
    "folder-expansion-icon"
  )[0];

  fireEvent.click(expansionIcon);
  expect(queryByText("graphics_0")).toBeNull();
  fireEvent.click(expansionIcon);
  getByText("graphics_0");
});

test("Deleting item", () => {
  const { getByText, queryByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Item"));
  const item = getByText("graphics_0");
  fireEvent.contextMenu(item);
  fireEvent.click(getByText("Delete Item"));
  expect(queryByText("graphics_0")).toBeNull();
});

test("Deleting folder with item", () => {
  const { getByText, queryByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("folders_0"));
  fireEvent.click(getByText("Create Item"));
  getByText("graphics_0");

  fireEvent.contextMenu(getByText("folders_0"));
  fireEvent.click(getByText("Delete Folder"));
  expect(queryByText("folders_0")).toBeNull();
  expect(queryByText("graphics_0")).toBeNull();
});

test("Item moves to different folder", () => {
  const { getByText, queryByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("folders_0"));
  fireEvent.click(getByText("Create Item"));
  getByText("graphics_0");

  const dropEvent = createEvent.drop(getByText("folders_1"));
  Object.assign(dropEvent, { dataTransfer: { getData: () => "graphics_0" } });

  fireEvent(getByText("folders_1"), dropEvent);
  expect(queryByText("graphics_0")).toBeNull();
  const folder = getByText("folders_1");
  const expansionIcon = folder.getElementsByClassName(
    "folder-expansion-icon"
  )[0];
  fireEvent.click(expansionIcon);
  getByText("graphics_0");
});

test("Moving folder transfers contents", () => {
  const { getByText, queryByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("folders_0"));
  fireEvent.click(getByText("Create Item"));
  within(getByText("folders_0")).getByText("graphics_0");

  const dropEvent = createEvent.drop(getByText("folders_1"));
  Object.assign(dropEvent, { dataTransfer: { getData: () => "folders_0" } });

  fireEvent(getByText("folders_1"), dropEvent);
  expect(queryByText("graphics_0")).toBeNull();
  const folder = getByText("folders_1");
  const expansionIcon = folder.getElementsByClassName(
    "folder-expansion-icon"
  )[0];
  fireEvent.click(expansionIcon);
  within(getByText("folders_1")).getByText("graphics_0");
});

test("Cannot move item to different root", () => {
  const { getByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Item"));

  const dropEvent = createEvent.drop(getByText("Audio"));
  Object.assign(dropEvent, { dataTransfer: { getData: () => "graphics_0" } });

  fireEvent(getByText("Audio"), dropEvent);
  getByText("graphics_0");
  const folder = getByText("Audio");
  const expansionIcon = folder.getElementsByClassName(
    "folder-expansion-icon"
  )[0];
  fireEvent.click(expansionIcon);
  expect(within(folder).queryByText("graphics_0")).toBeNull();
});

test("Cannot move folder to its child", () => {
  const { getByText } = render(<FolderView />);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Folder"));
  fireEvent.contextMenu(getByText("folders_0"));
  fireEvent.click(getByText("Create Folder"));
  within(getByText("folders_0")).getByText("folders_1");

  const dropEvent = createEvent.drop(getByText("folders_1"));
  Object.assign(dropEvent, { dataTransfer: { getData: () => "folders_0" } });

  fireEvent(getByText("folders_1"), dropEvent);
  within(getByText("folders_0")).getByText("folders_1");
});

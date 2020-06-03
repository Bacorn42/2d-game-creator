import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  within,
} from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import MainView from "../../../components/main/MainView";
import FolderView from "../../../components/main/FolderView";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faAngleDown,
  faAngleRight,
  faImage,
  faWindowClose,
  faWindowMaximize,
  faVolumeUp,
  faFileCode,
  faPlus,
  faMinus,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFolder,
  faAngleDown,
  faAngleRight,
  faImage,
  faWindowClose,
  faWindowMaximize,
  faVolumeUp,
  faFileCode,
  faPlus,
  faMinus,
  faAngleUp
);

afterEach(cleanup);

const renderSetup = (
  <>
    <FolderView />
    <MainView />
  </>
);

test("Graphics window renders", () => {
  const { container, getByText } = render(renderSetup);
  fireEvent.contextMenu(getByText("Graphics"));
  fireEvent.click(getByText("Create Item"));
  fireEvent.dblClick(getByText("graphics_0"));
  const windowBar = container.getElementsByClassName("window-bar")[0];
  within(windowBar).getByText("graphics_0");
});

test("Audio window renders", () => {
  const { container, getByText } = render(renderSetup);
  fireEvent.contextMenu(getByText("Audio"));
  fireEvent.click(getByText("Create Item"));
  fireEvent.dblClick(getByText("audio_0"));
  const windowBar = container.getElementsByClassName("window-bar")[0];
  within(windowBar).getByText("audio_0");
});

test("Function window renders", () => {
  const { container, getByText } = render(renderSetup);
  fireEvent.contextMenu(getByText("Functions"));
  fireEvent.click(getByText("Create Item"));
  fireEvent.dblClick(getByText("functions_0"));
  const windowBar = container.getElementsByClassName("window-bar")[0];
  within(windowBar).getByText("functions_0");
});

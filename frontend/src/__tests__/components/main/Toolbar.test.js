import React from "react";
import { render, cleanup, fireEvent } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import Toolbar from "../../../components/main/Toolbar";
import FolderView from "../../../components/main/FolderView";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolder,
  faAngleDown,
  faAngleRight,
  faImage,
  faVolumeUp,
  faFileCode,
  faCube,
  faTv,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFolder,
  faAngleDown,
  faAngleRight,
  faImage,
  faVolumeUp,
  faFileCode,
  faCube,
  faTv,
  faSave
);

afterEach(cleanup);

const renderSetup = (
  <>
    <Toolbar />
    <FolderView />
  </>
);

test("Creates graphics item", () => {
  const { container, getByText } = render(renderSetup);
  const graphicsIcon = container.getElementsByClassName("fa-image")[0];
  fireEvent.click(graphicsIcon);
  getByText("graphics_0");
});

test("Creates audio item", () => {
  const { container, getByText } = render(renderSetup);
  const graphicsIcon = container.getElementsByClassName("fa-volume-up")[0];
  fireEvent.click(graphicsIcon);
  getByText("audio_0");
});

test("Creates function item", () => {
  const { container, getByText } = render(renderSetup);
  const graphicsIcon = container.getElementsByClassName("fa-file-code")[0];
  fireEvent.click(graphicsIcon);
  getByText("functions_0");
});

test("Creates object item", () => {
  const { container, getByText } = render(renderSetup);
  const graphicsIcon = container.getElementsByClassName("fa-cube")[0];
  fireEvent.click(graphicsIcon);
  getByText("objects_0");
});

test("Creates scenes item", () => {
  const { container, getByText } = render(renderSetup);
  const graphicsIcon = container.getElementsByClassName("fa-tv")[0];
  fireEvent.click(graphicsIcon);
  getByText("scenes_0");
});

import React from "react";
import { render, cleanup } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import WindowAudio from "../../../components/window/WindowAudio";
import * as windowActions from "../../../actions/windowActions";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(faWindowClose, faWindowMaximize, faWindowRestore, faVolumeUp);

afterEach(cleanup);

test("Renders WindowAudio", () => {
  const { getByText } = render(<WindowAudio id={"audio_0"} />, {
    actions: [
      folderActions.createItem("folders_audio"),
      windowActions.openWindow("audio_0"),
    ],
  });
  getByText("audio_0");
});

import React from "react";
import { render, cleanup, fireEvent } from "../../../testUtils/renderUtil";
import "@testing-library/jest-dom/extend-expect";
import Editor from "../../../components/shared/Editor";
import * as folderActions from "../../../actions/folderActions";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileCode,
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faPlus,
  faMinus,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faFileCode,
  faWindowClose,
  faWindowMaximize,
  faWindowRestore,
  faPlus,
  faMinus,
  faAngleDown,
  faAngleUp
);

afterEach(cleanup);

test("Renders Editor", () => {
  const { getByText } = render(<Editor id={"functions_0"} />, {
    actions: [folderActions.createItem("folders_functions")],
  });
  getByText("1");
});

test("Styles code", () => {
  const { container } = render(<Editor id={"functions_0"} />, {
    actions: [folderActions.createItem("folders_functions")],
  });
  fireEvent.input(container.querySelector("textarea"), {
    target: { value: "for(i=0;i<10;i++){functions_0}" },
  });
  expect(container.getElementsByClassName("FOR")).toHaveLength(1);
  expect(container.getElementsByClassName("IDENTIFIER")).toHaveLength(4);
  expect(container.getElementsByClassName("USER_DEFINED")).toHaveLength(1);
  expect(container.getElementsByClassName("SEMICOLON")).toHaveLength(2);
});

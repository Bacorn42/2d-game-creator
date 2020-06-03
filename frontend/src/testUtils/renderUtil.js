import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import folderReducer from "../reducers/folderReducer";
import windowReducer from "../reducers/windowReducer";

function render(
  ui,
  {
    store = createStore(combineReducers({ folderReducer, windowReducer })),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };

import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import folderReducerInitialState from "../initialStates/folderReducerInitialState";
import folderReducer from "../reducers/folderReducer";

function render(
  ui,
  {
    initialState = { folderReducer: folderReducerInitialState },
    store = createStore(combineReducers({ folderReducer })),
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

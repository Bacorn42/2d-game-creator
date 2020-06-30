import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import AppCreator from "./app_creator/AppCreator";
import AppPlayer from "./app_player/AppPlayer";
import appCreatorStore from "./app_creator/store";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route path="/creator">
          <Provider store={appCreatorStore}>
            <AppCreator />
          </Provider>
        </Route>
        <Route path="/player">
          <AppPlayer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./Main";
import AppCreator from "./app_creator/AppCreator";
import AppPlayer from "./app_player/AppPlayer";
import Browse from "./app_site/Browse";
import appCreatorStore from "./app_creator/store";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/browse">
          <Browse />
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

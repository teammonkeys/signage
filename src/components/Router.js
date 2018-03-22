import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import SlideshowPage from "./SlideshowPage";
import SlidePage from "./SlidePage";
import SlidePageOld from "./SlidePageOld";
import AddRemoveLayout from "./AddRemoveLayout";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={SlidePage} />
    </Switch>
  </BrowserRouter>
);

export default Router;

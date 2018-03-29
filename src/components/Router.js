import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import App from "./App";
import SlidesPage from "./SlidesPage";
import EditSlidePage from "./EditSlidePage";
import SlideshowsPage from "./SlideshowsPage";
import EditSlideshowPage from "./EditSlideshowPage";
import SettingsPage from "./SettingsPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/main" component={App} />
      <Route exact path="/slides" component={SlidesPage} />
      <Route exact path="/editslide" component={EditSlidePage} />
      <Route exact path="/slideshows" component={SlideshowsPage} />
      <Route exact path="/editslideshows" component={EditSlideshowPage} />
      <Route exact path="/settings" component={SettingsPage} />
    </Switch>
  </BrowserRouter>
);

export default Router;

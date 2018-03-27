import React from "react";
import { Button } from "react-bootstrap";
import MainPage from "./MainPage";
import MainPageItem from "./MainPageItem";
import PlayPage from "./PlayPage";
import SlidesPage from "./SlidesPage";
import Zone from "./Zone";
import SlideshowsPage from "./SlideshowsPage";
import SettingsPage from "./SettingsPage";
import HelpPage from "./HelpPage";
import _ from "lodash";
import "../css/App.css";
import cat from "../assets/cat.jpg";
import play from "../assets/icons/play.png";
import slides from "../assets/icons/slides.png";
import slideshows from "../assets/icons/slideshows.png";
import settings from "../assets/icons/settings.png";
import help from "../assets/icons/help.png";
import exit from "../assets/icons/exit.png";

import { Document, Page } from "react-pdf/dist/entry.webpack";

class App extends React.Component {
  state = {
    /// SLIDE STATE ///
    layout: [
      {
        i: "z" + 0,
        x: 0,
        y: 0,
        w: 80,
        h: 80
      }
    ],
    newCounter: 1, // Increments when zones are added
    cols: 800, // Columns in the layout
    /** Width of the layout */
    width: 800,
    /** Defines the bottom of the layout */
    maxRows: 450,
    /** Defines gravity: horizontal (leftward), vertical (upward), or null */
    compactType: null,
    preventCollision: true,
    margin: [0, 0],
    numZones: 1,
    autoSize: false,
    rowHeight: 1,
    content: [],

    /// PAGE STATE ///
    pages: ["Play", "Slides", "Slideshows", "Settings", "Help", "Exit"],
    icons: [play, slides, slideshows, settings, help, exit],
    currentPage: "Main",
    pageHistory: ["Main"]
  };

  createElement = zone => {
    // The style of the remove button is declared here because
    // it won't work in the external CSS!
    const removeStyle = {
      position: "absolute",
      right: "1px",
      top: 0,
      cursor: "pointer"
    };
    const i = zone.i;
    // "i" has a 'z' in front of it to keep the key unique.
    // For the index, we only want the number.
    const index = i[i.length - 1];
    return (
      <div key={i} data-grid={zone}>
        <Zone
          className="zone"
          key={i}
          index={index}
          content={this.state.content[index]}
          assignContent={this.assignContent}
        />

        <span className="text">{index}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={() => this.removeZone(i)}
        >
          x
        </span>
      </div>
    );
  };

  /**
   * Syncs the layout in state with the layout of the RGL.
   */
  onLayoutChange = RGL => {
    if (RGL !== undefined) {
      // && !isAddingOrRemoving) {
      this.setState({ layout: RGL });
    }
  };

  /** Add a new zone to the slide. */
  addZone = () => {
    this.setState({
      // Add a new zone with a unique key.
      layout: this.state.layout.concat({
        i: "z" + this.state.newCounter,
        x: 0,
        y: 0,
        w: 80,
        h: 80
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  };

  removeZone = i => {
    // Remove all elements (in this case one element) from the array of layouts
    // whose "i" value matches the removed value's "i" value
    this.setState({ layout: _.reject(this.state.layout, { i: i }) });
  };

  /** Assigns content to a zone on double click. */
  assignContent = index => {
    let content = this.state.content;
    content[index] = cat;
    this.setState({ content });
  };

  renderPage = () => {
    if (this.state.currentPage === "Slides") {
      return (
        <SlidesPage
          createElement={this.createElement}
          addZone={this.addZone}
          removeZone={this.removeZone}
          assignContent={this.assignContent}
          onLayoutChange={this.onLayoutChange}
          {...this.state}
        />
      );
    } else if (this.state.currentPage === "Play") {
      return <PlayPage {...this.state} />;
    } else if (this.state.currentPage === "Slideshows") {
      return <SlideshowsPage {...this.state} />;
    } else if (this.state.currentPage === "Settings") {
      return <SettingsPage {...this.state} />;
    } else if (this.state.currentPage === "Help") {
      return <HelpPage {...this.state} />;
    } else {
      return (
        <div>
          <div>
            <MainPage
              pages={this.state.pages}
              icons={this.state.icons}
              setPage={this.setPage}
            />
          </div>
        </div>
      );
    }
  };

  renderButtons = () => {
    let buttons = [];
    if (this.state.currentPage === "Slides") {
      buttons.push(
        <Button key={1} onClick={this.addZone}>
          Add zone
        </Button>
      );
    }
    if (this.state.currentPage !== "Main") {
      buttons.push(
        <Button className="back" key={0} onClick={() => this.setPage("Main")}>
          Back to main page
        </Button>
      );
    } else {
      buttons.push(
        <Button
          className="logout"
          key={0}
          onClick={() => this.props.history.push(`/`)}
        >
          Log out
        </Button>
      );
    }
    return buttons;
  };

  setPage = page => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="items">{this.renderPage()}</div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;

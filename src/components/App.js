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
    slides: [
      {
        name: "Slide 1",
        index: 0,
        layout: [
          {
            i: "0" + "-" + 0,
            x: 0,
            y: 0,
            w: 80,
            h: 80
          },
          {
            i: "0" + "-" + 1,
            x: 160,
            y: 0,
            w: 80,
            h: 80
          }
        ],
        content: []
      },
      {
        name: "Slide 2",
        index: 1,
        layout: [
          {
            i: "1" + "-" + 0,
            x: 80,
            y: 0,
            w: 80,
            h: 80
          }
        ],
        content: []
      }
    ],
    isEditing: false,
    numSlides: 2,
    currentSlide: null,
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

    /// PAGE STATE ///
    pages: [
      "Play",
      "Slides",
      "EditSlide",
      "Slideshows",
      "Settings",
      "Help",
      "Exit"
    ],
    icons: [play, slides, slideshows, settings, help, exit],
    currentPage: "Main",
    pageHistory: ["Main"]
  };

  toggleIsEditing = () => {
    const isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });
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
    // The "i" value is the index of the slide and the index of the zone,
    // separated by a dash.
    const i = zone.i;
    // For the slide index, we take the first character of the "i" value.
    const slideIndex = i[0];
    // The zone index is the number after the dash.
    const zoneIndex = i[2];
    return (
      <div key={i} data-grid={zone}>
        <Zone
          className="zone"
          key={i}
          index={zoneIndex}
          content={this.state.slides[slideIndex].content[zoneIndex]}
          setContent={this.setContent}
        />

        <span className="text">{zoneIndex}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={() => this.removeZone(slideIndex, i)}
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
    if (RGL !== undefined && this.state.isEditing === true) {
      let index = this.state.currentSlide.index;
      let slides = this.state.slides;
      slides[index].layout = RGL;
      this.setState({ slides });
    }
  };

  setCurrentSlide = index => {
    this.setState({ currentSlide: this.state.slides[index] });
  };

  /** Add a new zone to the slide. */
  addZone = index => {
    const slides = this.state.slides;
    const newLayout = slides[index].layout.concat({
      // Set the "i" value. The first digit is the slide's index.
      // The second digit is the number of zones in the layout.
      i: index + "-" + slides[index].layout.length,
      x: 0,
      y: 0,
      w: 80,
      h: 80
    });
    slides[index].layout = newLayout;
    this.setState({
      slides
    });
  };

  removeZone = (index, i) => {
    const slides = this.state.slides;
    const layout = slides[index].layout;
    // Remove all elements (in this case one element) in the layout
    // whose "i" value matches the removed element's "i" value
    slides[index].layout = _.reject(layout, { i: i });
    this.setState({ slides });
  };

  /** Assigns content to the current zone on double click. */
  setContent = index => {
    const slides = this.state.slides;
    const currentSlide = this.state.currentSlide;
    slides[currentSlide.index].content[index] = cat;
    this.setState({ slides });
  };

  setPage = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Slides") {
      return (
        <SlidesPage
          createElement={this.createElement}
          addZone={this.addZone}
          removeZone={this.removeZone}
          setContent={this.setContent}
          onLayoutChange={this.onLayoutChange}
          setCurrentSlide={this.setCurrentSlide}
          toggleIsEditing={this.toggleIsEditing}
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
        <div className="items">
          <MainPage
            pages={this.state.pages}
            icons={this.state.icons}
            setPage={this.setPage}
          />
        </div>
      );
    }
  };

  renderButtons = () => {
    let buttons = [];
    if (this.state.isEditing) {
      buttons.push(
        <Button
          key={0}
          onClick={() => this.addZone(this.state.currentSlide.index)}
        >
          Add zone
        </Button>
      );
      buttons.push(
        <Button key={1} onClick={this.toggleIsEditing}>
          Back to Slides Page
        </Button>
      );
    } else {
      if (this.state.currentPage !== "Main") {
        buttons.push(
          <Button className="back" key={2} onClick={() => this.setPage("Main")}>
            Back to main page
          </Button>
        );
      } else {
        buttons.push(
          <Button
            className="logout"
            key={3}
            onClick={() => this.props.history.push(`/`)}
          >
            Log out
          </Button>
        );
      }
    }
    return buttons;
  };

  render() {
    return (
      <div>
        {this.renderPage()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;

import React from "react";
import { Button } from "react-bootstrap";
import MainPage from "./MainPage";
import PlayPage from "./PlayPage";
import SlidesPage from "./SlidesPage";
import SlideshowsPage from "./SlideshowsPage";
import SettingsPage from "./SettingsPage";
import HelpPage from "./HelpPage";
import "../css/App.css";
import play from "../assets/icons/play.png";
import slides from "../assets/icons/slides.png";
import slideshows from "../assets/icons/slideshows.png";
import settings from "../assets/icons/settings.png";
import help from "../assets/icons/help.png";
import exit from "../assets/icons/exit.png";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

class App extends React.Component {
  state = {
    /// EXAMPLE SLIDES ///
    slides: [
      {
        name: "Slide 1",
        index: 0,
        layout: [
          {
            i: "0",
            x: 0,
            y: 0,
            w: 80,
            h: 80
          },
          {
            i: "1",
            x: 160,
            y: 0,
            w: 80,
            h: 80
          }
        ],
        content: [null, null]
      },
      {
        name: "Slide 2",
        index: 1,
        layout: [
          {
            i: "2",
            x: 80,
            y: 0,
            w: 80,
            h: 80
          }
        ],
        content: [null]
      },
      {
        name: "Slide 3",
        index: 2,
        layout: [
          {
            i: "3",
            x: 240,
            y: 160,
            w: 80,
            h: 80
          }
        ],
        content: [null]
      }
    ],

    /// GENERAL STATE ///
    pages: ["Play", "Slides", "Slideshows", "Settings", "Help", "Exit"],
    icons: [play, slides, slideshows, settings, help, exit],
    currentPage: "Main", // The current sub-page rendered in the main page
    slideshows: [], // All saved slideshows
    currentSlide: null, // The slide being viewed or edited
    currentSlideshow: null, // The slideshow being viewed or edited
    spFiles: [], // Metadata of all files in SharePoint

    //// LAYOUT STATE ////
    cols: 800, // Columns in the layout
    width: 800, // Width of the layout
    maxRows: 450, // Defines the bottom of the layout
    rowHeight: 1, // Height of layout rows: equal to one pixel by default
    compactType: null, // Defines zone gravity: null means no gravity
    preventCollision: true, // Disallow zones from moving one another
    margin: [0, 0], // The space between zones: none by default
    autoSize: false // Whether zones resize to fit their content
  };

  /** Fetch all SharePoint files and set the sample slideshow */
  componentDidMount = () => {
    this.fetchAllSPFiles((err, spFiles) => {
      console.log(spFiles);
      this.setState({
        spFiles
      });
    });

    this.setState({
      slideshows: [
        {
          name: "Slideshow 1",
          index: 0,
          slides: [this.state.slides[0], this.state.slides[1]]
        },
        {
          name: "Slideshow 2",
          index: 1,
          slides: [this.state.slides[2]]
        }
      ]
      //const spFiles = await fetchSPFiles();
      //this.setState({ spFiles });
    });
  };

  fetchAllSPFiles = callback => {
    socket.on("spFiles", spFiles => callback(null, spFiles));
    socket.emit("fetchAllSPMetadata");
  };

  fetchSPFile = callback => {
    socket.on("spFile", spFile => callback(null, spFile));
    socket.emit("fetchSPFile");
  };

  getSPFile = () => {
    this.fetchSPFile((err, spFile) => {
      console.log(spFile);
    });
  };

  /**
   * Syncs the layout in state with the layout of the RGL.
   */
  onLayoutChange = RGL => {
    const slides = this.state.slides;
    const curSlideIndex = this.state.currentSlide.index;
    slides[curSlideIndex].layout = RGL;
    this.setState({ slides });
  };

  setCurrentSlide = slide => {
    const currentSlide = slide;
    this.setState({ currentSlide });
  };

  setCurrentSlideshow = index => {
    this.setState({
      currentSlideshow: this.state.slideshows[index],
      currentSlide: null
    });
  };

  /**
   * Generates a name for a new slide. If slides have been removed and there
   * are gaps between indices (e.g. 0, 2, 3) a name to fill the first
   * gap is generated. Otherwise, it generates a string ending in a number
   * equal to the length of the slide list before the addition, plus one.
   */
  generateSlideName = () => {
    const slides = this.state.slides;
    const slideNames = slides.map(slide => slide.name);
    for (let i = 0, name; i < slides.length; i++) {
      name = "Slide " + (i + 1);
      if (!slideNames.includes(name)) return name;
    }
    return "Slide " + (slides.length + 1);
  };

  /**
   * Generates an index for a new slide. If slides have been removed and there
   * are gaps between indices (e.g. 0, 2, 3) an index to fill the first
   * gap is generated. Otherwise, it generates an index equal to the length of the
   * slide list before the addition.
   */
  generateIndex = array => {
    const newArray = array.filter(element => element !== undefined);
    const indices = newArray.map(element => element.index);
    for (let i = 0; i < newArray.length; i++) {
      if (!indices.includes(i)) return i;
    }
    return newArray.length;
  };

  /**
   * After removing a slide, ensure each slide's index matches
   * its position in the slides array.
   */
  resetSlideIndices = () => {
    const slides = this.state.slides;
    slides.forEach((slide, index) => {
      slide.index = index;
    });
  };

  /**
   * After removing a zone, ensure each zone's index and 'i' value
   * matches its position in the slide's layout.
   */
  resetZoneIndices = () => {
    const curLayout = this.state.currentSlide.layout;
    curLayout.forEach((zone, index) => {
      zone.index = index;
      zone.i = index.toString();
    });
  };

  addSlide = () => {
    const slides = this.state.slides;
    slides.push({
      // The user-facing name is one higher than the index.
      name: this.generateSlideName(),
      index: slides.length,
      layout: [],
      content: []
    });
    this.setState({ slides });
  };

  removeSlide = index => {
    let slides = this.state.slides;
    slides = slides.filter(slide => slide.index !== index);
    this.resetSlideIndices();
    this.setState({ slides });
  };

  setCurrentLayout = layout => {
    const slides = this.state.slides;
    const curSlideIndex = this.state.currentSlide.index;
    slides[curSlideIndex].layout = layout;
    this.setState({ slides });
  };

  addSlideshow = () => {
    const slideshows = this.state.slideshows.concat({
      // The user-facing name is one higher than the index.
      name: "Slideshow " + slides.length + 1,
      index: slides.length
    });
    this.setState({ slideshows });
  };

  /** Return the position in the slides list of the slide with the given index. */
  getSlideIndex = index => {
    const slide = this.state.slides.find(slide => slide.index === index);
    return slide.index;
  };

  /** Add a new zone to the current slide. */
  addZone = () => {
    const slides = this.state.slides;
    const curSlide = this.state.currentSlide;
    const curIndex = curSlide.index;
    const curLayout = curSlide.layout;
    slides[curIndex].layout = curLayout.concat({
      i: curLayout.length.toString(),
      x: 0,
      y: 0,
      w: 80,
      h: 80
    });
    slides[curIndex].content[curLayout.length] = null;
    this.setState({ slides });
  };

  /** Remove the zone with the given index from the current slide. */
  removeZone = zoneIndex => {
    const slides = this.state.slides;
    const curSlide = this.state.currentSlide;
    const i = zoneIndex.toString();
    // Keep all zones except the one whose 'i' matches that of the removed zone
    const newLayout = curSlide.layout.filter(zone => zone.i !== i);
    slides[curSlide.index].layout = newLayout;

    const oldContent = slides[curSlide.index].content;
    delete oldContent[zoneIndex]; // Ensure object does not remain in memory
    oldContent.splice(zoneIndex, 1); // Remove the array position at the zone index
    this.resetZoneIndices(); // Match all zone indices with their new position in the layout array
    this.setState({ slides });
  };

  /** Assigns content to the current zone on double click. */
  setContent = (content, zoneIndex) => {
    const slides = this.state.slides;
    const curSlide = this.state.currentSlide;
    slides[curSlide.index].content[zoneIndex] = content;
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
          addSlide={this.addSlide}
          removeSlide={this.removeSlide}
          toggleIsAddingContent={this.toggleIsAddingContent}
          generateIndex={this.generateIndex}
          getSlide={this.getSlide}
          setCurrentLayout={this.setCurrentLayout}
          {...this.state}
        />
      );
    } else if (this.state.currentPage === "Play") {
      return <PlayPage {...this.state} />;
    } else if (this.state.currentPage === "Slideshows") {
      return (
        <SlideshowsPage
          createElement={this.createElement}
          addZone={this.addZone}
          removeZone={this.removeZone}
          setContent={this.setContent}
          onLayoutChange={this.onLayoutChange}
          renderSlidesList={this.renderSlidesList}
          setCurrentSlide={this.setCurrentSlide}
          setCurrentSlideshow={this.setCurrentSlideshow}
          toggleIsAddingContent={this.toggleIsAddingContent}
          generateIndex={this.generateIndex}
          setCurrentLayout={this.setCurrentLayout}
          {...this.state}
        />
      );
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
        <Button onClick={this.getSPFile}>Fetch</Button>
      </div>
    );
  }
}

export default App;

import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Slide from "./Slide";
import Zone from "./Zone";
import "../css/Slide.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import cat from "../assets/cat.jpg";
import ReactGridLayout from "react-grid-layout";
const removeStyle = {
  position: "absolute",
  right: "2px",
  top: 0,
  cursor: "pointer"
};

class SlidePage extends React.PureComponent {
  state = {
    className: "layout",
    // Start with one content zone loaded
    layout: [
      {
        i: "zone0",
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        content: null
      }
    ],
    /*
    layout: [{}].map(function(i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 2,
        content: null
      };
    }),
    */
    rowHeight: 50,
    cols: 12,
    width: 800,
    autoSize: true,
    compactType: null,
    preventCollision: true,
    margin: [0, 0],
    numZones: 1,
    // A useless value. Used to overcome a bug in the module.
    dummyCounter: 0
  };

  /**
   * Generate a div for each zone in the layout.
   * A button in the top-right corner
   */
  generateZones = layout => {
    let zones = [];
    let content;
    layout.map((item, index) => {
      zones.push(
        <div key={index} index={index} data-grid={layout[index]}>
          <Zone
            key={index}
            index={index}
            content={this.state.layout[index].content}
            onDoubleClick={this.onDoubleClick}
          />
          <span
            style={removeStyle}
            className="remove-button"
            onClick={() => this.removeZone(index)}
          >
            x
          </span>
        </div>
      );
    });
    return zones;
  };

  /**
   * Calls when the layout of zones has changed
   */
  onLayoutChange = layout => {
    // console.log("Layout changed");
  };

  /**
   * Calls when a zone is double-clicked
   */
  onDoubleClick = index => {
    let img = document.createElement("img");
    img.src = cat; // imported from Assets folder
    img.className = "zone-content";
    let layout = this.state.layout;
    layout[index].content = cat;
    this.setState({
      layout,
      // Incremented to overcome a bug in the module
      dummyCounter: this.state.dummyCounter + 1
    });
    /*
    if (zone.hasChildNodes()) {
      alert("You already have a cat. Don't be greedy!");
    } else {
      zone.appendChild(img);
    }
    */
  };

  /**
   * Add a new content zone to the layout (the array of
   * content zones) stored in state.
   */
  addZone = () => {
    let layout = this.state.layout;
    let cols = this.state.cols;
    let numZones = this.state.numZones;

    // Prevent the addition of new zones when the screen is full
    if (numZones >= cols * this.state.maxRows / 2) {
      alert("No more room!");
    } else {
      // Create an object to contain a new zone
      let newZone = {};

      // Set the values of the new zone
      newZone = {
        // Give the zone a unique descriptive name
        i: "zone" + numZones,

        // If all columns are full, put the new zone at the bottom...
        // ...otherwise, put it to the right of the last one
        x: (numZones * 2) % cols,

        // If row is filled, put new zone on the next row.
        y: Math.floor(numZones / (cols / 2)) * 2,

        // Width and height are in grid units, not pixels
        w: 2,
        h: 2,

        // Every zone starts without a content item assigned
        content: null
      };

      // Add the new zone to the copy of our current zones
      layout.push(newZone);

      // Update the state with the new array of zones
      this.setState({ layout, numZones: this.state.numZones + 1 });
    }
  };

  removeZone = index => {
    let layout = this.state.layout;
    let cols = this.state.cols;
    let numZones = this.state.numZones;

    // Remove the zone at the given index
    layout.splice(index, 1);
    this.setState({
      layout,
      numZones: this.state.numZones - 1
    });
  };

  render() {
    let layout = this.state.layout;
    if (layout === null) return null;
    return (
      <div className="slide-page">
        <div className="slide">
          <Slide
            generateZones={this.generateZones}
            onLayoutChange={this.onLayoutChange}
            {...this.state}
          />
        </div>
        <button className="add-zone" onClick={this.addZone}>
          Add zone
        </button>
      </div>
    );
  }
}

export default SlidePage;

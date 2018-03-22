import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Slide from "./Slide";
import Zone from "./Zone";
import "../css/Slide.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import cat from "../assets/cat.jpg";

class SlidePage extends React.PureComponent {
  state = {
    currentZone: null,
    currentContent: null,
    className: "layout",
    zones: [0].map(function(i, key, list) {
      return {
        i: i.toString(),
        x: i * 2,
        y: 0,
        w: 2,
        h: 6,
        add: i === (list.length - 1).toString()
      };
    }),
    newCounter: 1,
    rowHeight: 15,
    cols: 12,
    width: 800,
    autoSize: false,
    compactType: null,
    newCounter: 0
  };

  componentDidMount() {
    this.setState({ layout: this.generateLayout() });
    console.log("Double click to put a cat in the zone.");
  }

  generateLayout() {
    const s = this.state;
    return _.map(new Array(s.zones), function(item, i) {
      const y = _.result(s, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  generateZones = (zones, handleClick) => {
    return _.map(_.range(zones.length), function(i) {
      return (
        <div key={i} w={2} h={2}>
          <Zone key={i} index={i} content={null} handleClick={handleClick} />
        </div>
      );
    });
  };

  onLayoutChange = layout => {
    // console.log("dook");
  };

  handleClick = event => {
    const img = document.createElement("img");
    img.src = cat; // imported from Assets folder
    img.className = "zone-content";
    const zone = event.currentTarget;
    if (zone.hasChildNodes()) {
      alert("You already have a cat. Don't be greedy!");
    } else {
      zone.appendChild(img);
    }
  };

  addZone = () => {
    let newZone = []; // Initialize an array for a new zone
    let zones = this.state.zones; // Save the current array of zones
    newZone = {
      // Set the label for the new zone based on the counter
      i: "n" + this.state.newCounter, //

      // If all columns are full, put the new zone at the bottom...
      // ...otherwise, put it to the right of the last one
      x: (this.state.zones.length * 2) % (this.state.cols || 12),

      // Always put the new zone at the bottom
      y: Infinity,

      w: 2, // width of 2 grid units
      h: 2 // height of 2 grid units
    };
    // Add the new zone to the copy of our current zones
    zones.push(newZone);
    // Update the state with the new array of zones
    this.setState({ zones, newCounter: this.state.newCounter + 1 });
  };

  render() {
    return (
      <div className="slide">
        <button onClick={this.addZone}>Add Zone</button>
        <Slide
          generateZones={this.generateZones}
          onLayoutChange={this.onLayoutChange}
          handleClick={this.handleClick}
          layout={this.state.zones}
          {...this.state}
        />
      </div>
    );
  }
}

export default SlidePage;

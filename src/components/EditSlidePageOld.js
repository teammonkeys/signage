import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import Zone from "./Zone";
import "../css/SlidePage.css";
import cat from "../assets/cat.jpg";

/** True immediately after adding or removing a zone, and false otherwise. */
var isAddingOrRemoving;

/** This page allows the editing of a slide's layout and settings. */
class EditSlidePage extends React.Component {
  state = {
    layout: [
      {
        i: "z" + 0,
        x: 0,
        y: 0,
        w: 80,
        h: 80,
        content: null
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
    content: []
  };

  createElement = zone => {
    const removeStyle = {
      position: "absolute",
      right: "1px",
      top: 0,
      cursor: "pointer"
    };
    const i = zone.add ? "+" : zone.i;
    let index = i[i.length - 1];
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
  onLayoutChange = () => {
    if (this.RGL !== undefined && !isAddingOrRemoving) {
      this.setState({ layout: this.RGL.state.layout });
    }
    isAddingOrRemoving = false;
  };

  /** Add a new zone to the slide. */
  addZone = () => {
    isAddingOrRemoving = true;
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
    isAddingOrRemoving = true;
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

  render() {
    return (
      <div>
        <div className="slide">
          <ReactGridLayout
            ref={RGL => {
              this.RGL = RGL;
            }}
            onLayoutChange={this.onLayoutChange}
            {...this.state}
          >
            {_.map(this.state.layout, zone => this.createElement(zone))}
          </ReactGridLayout>
        </div>
        <button onClick={this.addZone}>Add Item</button>
      </div>
    );
  }
}

export default EditSlidePage;

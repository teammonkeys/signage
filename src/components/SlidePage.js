import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import Zone from "./Zone";
import "../css/SlidePage.css";
import cat from "../assets/cat.jpg";

/** True immediately after adding or removing a zone, and false otherwise. */
var isAddingOrRemoving;
/** A copy of the ReactGridLayout object that contains our zones */
var RGL;

/** This page allows the editing of a slide's layout and settings. */
class SlidePage extends React.Component {
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

  onAddItem = this.onAddItem.bind(this);
  onLayoutChange = this.onLayoutChange.bind(this);
  // onDoubleClick = this.onDoubleClick.bind(this);
  //onDoubleClick = this.onDoubleClick.bind(this);

  componentDidMount() {
    RGL = this.RGL;
  }

  /**
   * Syncs the layout in state with the layout of the RGL.
   */
  onLayoutChange() {
    if (RGL != undefined && !isAddingOrRemoving) {
      this.setState({ layout: RGL.state.layout });
    }
    isAddingOrRemoving = false;
  }

  createElement(zone) {
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
          onDoubleClick={this.onDoubleClick}
        />

        <span className="text">{index}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddItem() {
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
  }

  onRemoveItem(i) {
    isAddingOrRemoving = true;
    this.setState({ layout: _.reject(this.state.layout, { i: i }) });
  }

  onDoubleClick = index => {
    let content = this.state.content;
    content[index] = cat;
    console.log(index);
    this.setState({ content });
    console.log(this.state.content[index]);
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
        <button onClick={this.onAddItem}>Add Item</button>
      </div>
    );
  }
}
export default SlidePage;

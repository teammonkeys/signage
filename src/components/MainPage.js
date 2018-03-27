import React from "react";
import SlidesPage from "./SlidesPage";
import Zone from "./Zone";
import MainPageItem from "./MainPageItem";
import _ from "lodash";
import cat from "../assets/cat.jpg";

import { Document, Page } from "react-pdf/dist/entry.webpack";

class MainPage extends React.Component {
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
    console.log(RGL);
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

  renderItems() {
    var items = [];
    for (let i = 0; i < 6; i++) {
      items.push(<MainPageItem className="item" key={i} />);
    }
    return items;
  }

  render() {
    return <div className="wrapper">{this.renderItems()}</div>;
    /*
      <SlidesPage
        createElement={this.createElement}
        addZone={this.addZone}
        removeZone={this.removeZone}
        assignContent={this.assignContent}
        onLayoutChange={this.onLayoutChange}
        {...this.state}
      />
      */
  }
}

export default MainPage;

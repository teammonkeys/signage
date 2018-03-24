import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import "../css/SlidePage.css";

/** True immediately after adding or removing a zone, and false otherwise. */
var isAddingOrRemoving;

/** This page allows the editing of a slide's layout and settings. */
class SlidePage extends React.Component {
  state = {
    layout: [
      {
        i: "n" + 0,
        x: 0,
        y: 0,
        w: 80,
        h: 80,
        content: null
      }
    ],
    add: 0, //i === (list.length - 1).toString(),
    newCounter: 1, // Increments when zones are added
    cols: 800, // Columns in the layout
    width: 800, // Width of the layout
    maxRows: 450, // Defines the bottom of the layout
    compactType: null, // Defines gravity: horizontal (leftward), vertical (upward), or null
    preventCollision: true,
    margin: [0, 0],
    numZones: 1,
    autoSize: false,
    rowHeight: 1,
    RGL: null // The ReactGridLayout object that contains our zones
  };

  onAddItem = this.onAddItem.bind(this);
  onLayoutChange = this.onLayoutChange.bind(this);

  componentDidMount() {
    this.setState({ RGL: this.RGL });
  }

  onLayoutChange() {
    if (this.RGL != undefined && !isAddingOrRemoving) {
      this.setState({ layout: this.RGL.state.layout });
    }
    isAddingOrRemoving = false;
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
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
    console.log(isAddingOrRemoving);
    //console.log(this.state.layout);
    this.setState({
      // Add a new item. It must have a unique key!
      layout: this.state.layout.concat({
        i: "n" + this.state.newCounter,
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

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <ReactGridLayout
          ref={RGL => {
            this.RGL = RGL;
          }}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          rowHeight={1}
          cols={800}
          width={800}
          maxRows={450}
          compactType={null}
          preventCollision={true}
          margin={[0, 0]}
          autoSize={false}
          onLayoutChange={this.onLayoutChange}
        >
          {_.map(this.state.layout, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}
export default SlidePage;

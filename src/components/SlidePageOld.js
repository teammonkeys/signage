import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import SlideOld from "./SlideOld";
import Zone from "./Zone";
import "../css/Slide.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import cat from "../assets/cat.jpg";

class SlidePageOld extends React.PureComponent {
  state = {
    currentZone: null,
    currentContent: null,
    className: "layout",
    zones: 5,
    rowHeight: 15,
    cols: 12,
    width: 800,
    // verticalCompact: false,
    layout: [],
    autoSize: false,
    newCounter: 0
  };

  componentDidMount() {
    this.setState({ layout: this.generateLayout() });
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
    return _.map(_.range(zones), function(i) {
      return (
        <div key={i}>
          <Zone key={i} index={i} content={null} handleClick={handleClick} />
        </div>
      );
    });
  };

  onLayoutChange = layout => {
    // this.state.onLayoutChange(layout);
    // this.setState({ layout: generateLayout() });
  };

  handleClick = event => {
    const zone = event.currentTarget;
    console.log(zone);
  };

  /*
  addZone = () => {
    this.setState({
      zones: this.state.zones.concat({
      i = "n" + this.state.newCounter,
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      h: 2
    }),
    newCounter: this.state.newCounter + 1;
    })
    
  };
*/

  render() {
    const zones = this.state.zones;
    return (
      <div className="slide">
        <button onClick={this.addZone}>Add Item</button>
        <SlideOld
          generateZones={this.generateZones}
          onLayoutChange={this.onLayoutChange}
          handleClick={this.handleClick}
          {...this.state}
        />
      </div>
    );
  }
}

export default SlidePageOld;

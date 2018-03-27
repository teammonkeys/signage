import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import Zone from "./Zone";
import "../css/SlidePage.css";
import cat from "../assets/cat.jpg";

class EditSlidePage extends React.Component {
  render() {
    return (
      <div>
        <div className="slide">
          <ReactGridLayout
            ref={RGL => {
              this.RGL = RGL;
            }}
            onLayoutChange={() => this.props.onLayoutChange(this.RGL)}
            {...this.props}
          >
            {_.map(this.props.layout, zone => this.props.createElement(zone))}
          </ReactGridLayout>
        </div>
        <button onClick={this.props.addZone}>Add Item</button>
      </div>
    );
  }
}

export default EditSlidePage;

import React from "react";
import GridItem from "react-grid-layout";
import cat from "../assets/cat.jpg";
import "../css/SlidePage.css";

class Zone extends React.Component {
  render() {
    return (
      <div
        className="zone"
        onDoubleClick={() => this.props.onDoubleClick(this.props.index)}
      >
        <img className="zone-content" src={this.props.content} />{" "}
      </div>
    );
  }
}

export default Zone;

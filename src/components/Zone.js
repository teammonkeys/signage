import React from "react";
import "../css/Zone.css";
import GridItem from "react-grid-layout";
import cat from "../assets/cat.jpg";

class Zone extends React.Component {
  render() {
    return (
      <div
        className="zone"
        key={this.props.index}
        onDoubleClick={this.props.handleClick}
      />
    );
  }
}

export default Zone;

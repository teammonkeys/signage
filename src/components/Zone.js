import React from "react";
import GridItem from "react-grid-layout";
import cat from "../assets/cat.jpg";

class Zone extends React.Component {
  render() {
    return (
      <div
        className="zone"
        key={this.props.index}
        layout={this.props.layout}
        onDoubleClick={() => this.props.onDoubleClick(this.props.index)}
      >
        <img className="zone-content" src={this.props.content} />{" "}
      </div>
    );
  }
}

export default Zone;

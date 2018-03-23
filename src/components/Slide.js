import React from "react";
import ReactGridLayout from "react-grid-layout";

class Slide extends React.Component {
  render() {
    return (
      <ReactGridLayout {...this.props}>
        {this.props.generateZones(this.props.layout, this.props.handleClick)}
      </ReactGridLayout>
    );
  }
}

export default Slide;

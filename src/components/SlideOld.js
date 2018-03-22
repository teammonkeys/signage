import React from "react";
import ReactGridLayout from "react-grid-layout";

class SlideOld extends React.Component {
  render() {
    return (
      <ReactGridLayout {...this.props}>
        {this.props.generateZones(this.props.zones, this.props.handleClick)}
      </ReactGridLayout>
    );
  }
}

export default SlideOld;

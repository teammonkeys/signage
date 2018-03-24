import React from "react";
import ReactGridLayout from "react-grid-layout";

class Slide extends React.Component {
  componentDidMount() {
    console.log(this.gridLayout);
  }
  render() {
    return (
      <div>
        <ReactGridLayout
          ref={gridLayout => (this.gridLayout = gridLayout)}
          {...this.props}
        >
          {this.props.generateZones(this.props.layout, this.props.handleClick)}
        </ReactGridLayout>
      </div>
    );
  }
}

export default Slide;

import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import "../css/SlidePage.css";

class EditSlidePage extends React.Component {
  onLayoutChange = () => {
    this.props.onLayoutChange(this.RGL);
  };

  render() {
    return (
      <div className="slide">
        <ReactGridLayout
          ref={RGL => {
            this.RGL = RGL;
          }}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          {_.map(this.props.layout, newZone =>
            this.props.createElement(newZone)
          )}
        </ReactGridLayout>
      </div>
    );
  }
}

export default EditSlidePage;

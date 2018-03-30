import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import "../css/SlidesPage.css";

class Slide extends React.Component {
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
          {this.props.slides[this.props.index].layout.map(newZone =>
            this.props.createElement(newZone)
          )}
        </ReactGridLayout>
      </div>
    );
  }
}

/*
{_.map(this.props.slides[this.props.index].layout, newZone =>
  this.props.createElement(newZone)
)}
*/

export default Slide;

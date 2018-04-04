import React from "react";
import ReactGridLayout from "react-grid-layout";
import Zone from "./Zone";
import "../css/SlidesPage.css";

class Slide extends React.Component {
  createZone = (newZone, zoneIndex) => {
    const slideIndex = this.props.index;
    return (
      <div key={zoneIndex} data-grid={newZone}>
        <Zone
          className="zone"
          key={newZone.i} // Unique value for React
          index={zoneIndex}
          i={newZone.i} // Unique value for RGL
          slideIndex={slideIndex} // The index of the zone's parent slide
          content={this.props.slides[slideIndex].content[zoneIndex]}
          setContent={this.props.setContent}
          toggleIsAddingContent={this.props.toggleIsAddingContent}
          removeZone={this.props.removeZone}
          currentSlide={this.props.currentSlide}
        />
      </div>
    );
  };

  renderSlide = () => {
    return (
      <div className="slide">
        <ReactGridLayout
          {...this.props}
          onLayoutChange={this.props.onLayoutChange}
        >
          {this.props.currentSlide.layout.map((newZone, zoneIndex) =>
            this.createZone(newZone, zoneIndex)
          )}
        </ReactGridLayout>
      </div>
    );
  };

  render() {
    return this.renderSlide();
  }
}

export default Slide;

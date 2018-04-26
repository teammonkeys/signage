import React from "react";

class DisplayZone extends React.Component {
  render() {
    // console.log(cat);
    //console.log(this.props.currentSlide.content[this.props.zoneIndex]);
    return (
      <React.Fragment>
        <div className="display-zone">
          <img src={this.props.currentSlide.content[this.props.zoneIndex]} />
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayZone;

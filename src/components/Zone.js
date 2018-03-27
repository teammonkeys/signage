import React from "react";
import "../css/SlidePage.css";

class Zone extends React.Component {
  render() {
    return (
      <div
        className="zone"
        onDoubleClick={() => this.props.assignContent(this.props.index)}
      >
        <img className="zone-content" src={this.props.content} alt={""} />
      </div>
    );
  }
}

export default Zone;

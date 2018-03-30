import React from "react";
import "../css/SlidesPage.css";

class Zone extends React.Component {
  setContent = () => {
    this.props.setContent(this.props.index);
  };

  render() {
    return (
      <div className="zone" onDoubleClick={this.setContent}>
        <img className="zone-content" src={this.props.content} alt={""} />
      </div>
    );
  }
}

export default Zone;

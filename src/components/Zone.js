import React from "react";
import ContentItem from "./ContentItem";
import cat from "../assets/cat.jpg";
import "../css/SlidesPage.css";

// The style of the remove button is declared here because
// it won't work in the external CSS!
const removeStyle = {
  position: "absolute",
  right: "1px",
  top: 0,
  cursor: "pointer"
};

class Zone extends React.Component {
  setContent = () => {
    this.props.toggleIsAddingContent();
    this.props.setContent(cat, this.props.index);
    //this.props.setContent(this.props.content, this.props.index);
  };

  removeZone = () => {
    this.props.removeZone(this.props.i);
  };

  render() {
    return (
      <div className="zone" onDoubleClick={this.setContent}>
        <span className="remove" style={removeStyle} onClick={this.removeZone}>
          x
        </span>
        <div>
          <img className="zone-content" src={this.props.content} alt={""} />
        </div>
      </div>
    );
  }
}

export default Zone;

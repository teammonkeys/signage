import React from "react";
import ContentItem from "./ContentItem";
import cat from "../assets/cat.jpg";
import "../css/SlidesPage.css";

class Zone extends React.Component {
  setContent = () => {
    this.props.toggleIsAddingContent();
    this.props.setContent(cat, this.props.index);
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

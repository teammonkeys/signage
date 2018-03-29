import React from "react";
import { Thumbnail } from "react-bootstrap";
import slideIcon from "../assets/slideshow.png";
import "../css/MainPageItem.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

class MainPageItem extends React.Component {
  exit = () => {
    alert("You cannot exit. You are trapped here forever.");
  };

  render() {
    return (
      <div>
        <Thumbnail
          className="item"
          src={this.props.icon}
          alt={this.props.page}
          onClick={this.exit}
        >
          <h3>{this.props.page}</h3>
        </Thumbnail>
      </div>
    );
  }
}
export default MainPageItem;

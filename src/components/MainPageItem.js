import React from "react";
import slideIcon from "../assets/slideshow.png";
import "../css/MainPageItem.css";

class MainPageItem extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <img src={slideIcon} />
      </div>
    );
  }
}
export default MainPageItem;

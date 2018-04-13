import React from "react";
import { ListGroupItem } from "react-bootstrap";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

class SPContentListItem extends React.Component {
  setContent = async () => {
    //const contentFile = await fetchSPFile(this.props.fileType, this.props.url);
    const zoneIndex = this.props.zoneIndex;
    if (this.props.category === "document") {
      //const contentItem = <img src={contentFile} />;
      //this.props.setContent(contentFile, 0);
      //this.props.setContent(contentItem, zoneIndex);
    } else {
      console.log("Invalid file");
    }
  };

  render() {
    return (
      <ListGroupItem
        onClick={() => console.log("lama")}
        onDoubleClick={this.setContent}
      >
        <p>{this.props.name}</p>
      </ListGroupItem>
    );
  }
}

export default SPContentListItem;

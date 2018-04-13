import React from "react";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import SPContentListItem from "./SPContentListItem";
import "bootstrap/dist/css/bootstrap.css";
import cat from "../assets/cat.jpg";
import "../css/SlidesPage.css";

// Style declared here because it won't work in the external CSS
const removeStyle = {
  position: "absolute",
  right: "1px",
  top: 0,
  cursor: "pointer"
};

class Zone extends React.Component {
  setContent = () => {
    this.props.toggleIsAddingContent();
    const contentType = this.props.contentType;
    if (contentType === "sp") {
      this.setSPContent();
    } else if (contentType === "local") {
      this.setLocalContent();
    } else if (contentType === "url") {
      this.setUrlContent();
    } else if (contentType === "text") {
      this.setTextContent();
    } else {
      console.log("Invalid content type");
    }
  };

  renderSPContentMenu = () => {
    if (!this.props.isAddingContent) return null;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>SharePoint Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>{this.renderSPContentListItems()}</ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.toggleIsAddingContent}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  renderSPContentListItems = () => {
    const spFiles = this.props.spFiles;
    const listItems = [];
    if (spFiles === undefined) return null;
    spFiles.map((element, index) =>
      listItems.push(
        <ListGroupItem key={index}>
          <SPContentListItem
            key={index}
            slideIndex={this.props.slideIndex}
            zoneIndex={this.props.zoneIndex}
            name={spFiles[index].name}
            url={spFiles[index].url}
            fileType={spFiles[index].fileType}
            category={spFiles[index].category}
            setContent={this.props.setContent}
          />
        </ListGroupItem>
      )
    );
    return listItems;
  };

  setContentType = contentType => {
    console.log("Set content type as " + contentType);
    this.setState({ contentType });
  };

  setSPContent = () => {
    this.renderSPContentMenu();
  };

  setLocalContent = () => {
    console.log("Setting local content");
  };

  setUrlContent = () => {
    console.log("Setting URL content");
  };

  setTextContent = () => {
    console.log("Setting text content");
  };

  removeZone = () => {
    this.props.removeZone(this.props.i);
  };

  render() {
    // console.log(cat);
    console.log(this.props.currentSlide.content[this.props.zoneIndex]);
    return (
      <React.Fragment>
        <div className="zone" onDoubleClick={this.props.toggleIsAddingContent}>
          <span
            className="remove"
            style={removeStyle}
            onClick={this.removeZone}
          >
            x
          </span>
          <div>
            <img src={this.props.currentSlide.content[this.props.zoneIndex]} />{" "}
          </div>
        </div>
        {this.renderSPContentMenu()}
      </React.Fragment>
    );
  }
}

export default Zone;

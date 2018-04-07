import React from "react";
import Slide from "./Slide";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import SPContentListItem from "./SPContentListItem";

class EditSlidePage extends React.Component {
  state = {
    contentType: "sp", // Dropdown menu will determine this in the future
    isAddingContent: false
  };

  /** Toggle whether the page is in content-adding mode. */
  toggleIsAddingContent = () => {
    const isAddingContent = this.state.isAddingContent;
    this.setState({ isAddingContent: !isAddingContent });
  };

  addZone = () => {
    this.props.addZone(this.props.index);
  };

  /** Set what type of content will be added to a zone (SharePoint, URL, etc.) */
  setContentType = contentType => {
    this.setState({ contentType });
  };

  renderButtons = () => {
    return (
      <React.Fragment>
        <Button key={0} onClick={this.addZone}>
          Add zone
        </Button>
        <Button key={1} onClick={this.props.toggleIsEditing}>
          Back to Slides
        </Button>
      </React.Fragment>
    );
  };

  renderContentMenu = () => {
    if (!this.state.isAddingContent) return null;
    if (this.state.contentType === "sp") {
      return this.renderSPContentMenu();
    }
  };

  renderSPContentMenu = () => {
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
            //zoneIndex={zoneIndex}
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

  render() {
    return (
      <div>
        <div className="slide">
          <Slide
            {...this.props}
            key={this.props.slideIndex}
            slideIndex={this.props.slideIndex}
            layout={this.props.layout}
            toggleIsAddingContent={this.toggleIsAddingContent}
            contentType={this.state.contentType}
          />
          {this.renderContentMenu()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default EditSlidePage;

import React from "react";
import Slide from "./Slide";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class EditSlidePage extends React.Component {
  state = {
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

  renderContentModal = () => {
    if (!this.state.isAddingContent) return null;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>SharePoint Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>{this.renderContentListItems()}</ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.toggleIsAddingContent}>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  };

  renderContentListItems = () => {
    const spFiles = this.props.spFiles;
    const listItems = [];
    if (spFiles === undefined) return null;
    spFiles.map((element, index) =>
      listItems.push(<ListGroupItem key={index}>{element.name}</ListGroupItem>)
    );
    return listItems;
  };

  renderButtons = () => {
    const buttons = [];
    buttons.push(
      <Button key={0} onClick={this.addZone}>
        Add zone
      </Button>
    );
    buttons.push(
      <Button key={1} onClick={this.props.toggleIsEditing}>
        Back to Slides
      </Button>
    );
    return buttons;
  };

  render() {
    return (
      <div>
        <div className="slide">
          <Slide
            {...this.props}
            key={this.props.index}
            index={this.props.index}
            layout={this.props.layout}
            toggleIsAddingContent={this.toggleIsAddingContent}
          />
          {this.renderContentModal()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default EditSlidePage;

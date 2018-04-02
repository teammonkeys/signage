import React from "react";
import Slide from "./Slide";
import {
  Panel,
  ListGroup,
  ListGroupItem,
  Button,
  Modal
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

class EditSlidePage extends React.Component {
  state = {
    isAddingContent: false
  };

  renderContentModal = () => {
    if (!this.props.isAddingContent) return null;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>SharePoint Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>{this.renderContentListItems()}</ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.toggleIsAddingContent}>Close</Button>
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

  render() {
    return (
      <div className="slide">
        <Slide
          {...this.props}
          key={this.props.index}
          index={this.props.index}
          layout={this.props.layout}
        />
        {this.renderContentModal()}
      </div>
    );
  }
}

export default EditSlidePage;

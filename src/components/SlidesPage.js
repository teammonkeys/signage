import React from "react";
import Slide from "./Slide";
import { Button, Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import EditSlidePage from "./EditSlidePage";

class SlidesPage extends React.Component {
  state = {
    isEditing: false
  };

  /** Toggle whether the page is in editing mode. */
  toggleIsEditing = () => {
    const isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });
  };

  renderSlides = () => {
    const slides = [];
    this.props.slides.forEach((slide, index) => {
      if (slide !== null)
        slides.push(
          <Slide
            {...this.props}
            key={index}
            index={index}
            isDraggable={false}
            isResizeable={false}
            layout={this.props.slides[index].layout}
          />
        );
    });
    return slides;
  };

  renderCurrentSlide = () => {
    if (this.props.currentSlide === null) return null;
    const curSlide = this.props.currentSlide;
    return (
      <div className="slidePreview">
        <Slide
          {...this.props}
          key={curSlide.index}
          index={curSlide.index}
          layout={curSlide.layout}
          isDraggable={false}
          isResizeable={false}
          isEditing={false}
        />
      </div>
    );
  };

  renderSlidesList = () => {
    const slidesList = [];
    this.props.slides.forEach((slide, index) => {
      if (slide !== undefined) {
        slidesList.push(
          <ListGroupItem
            key={index}
            onClick={() => this.props.setCurrentSlide(slide)}
          >
            {slide.name}
          </ListGroupItem>
        );
      }
    });
    return slidesList;
  };

  removeCurrentSlide = () => {
    if (this.props.currentSlide !== null) {
      this.props.removeSlide(this.props.currentSlide.index);
      this.props.setCurrentSlide(null);
    }
  };

  renderButtons = () => {
    const buttons = [];
    buttons.push(
      <Button key={0} onClick={this.props.addSlide}>
        Add slide
      </Button>
    );
    if (this.props.currentSlide !== null) {
      buttons.push(
        <Button key={1} onClick={this.toggleIsEditing}>
          Edit slide
        </Button>
      );
      buttons.push(
        <Button key={2} onClick={this.removeCurrentSlide}>
          Remove slide
        </Button>
      );
    }
    return buttons;
  };

  render() {
    const curSlide = this.props.currentSlide;
    if (this.state.isEditing) {
      return (
        <EditSlidePage
          {...this.props}
          key={curSlide.index}
          slideIndex={curSlide.index}
          layout={curSlide.layout}
          isEditing={this.state.isEditing}
          toggleIsEditing={this.toggleIsEditing}
        />
      );
    }
    return (
      <div>
        <div className="slidesPage">
          <Panel className="slidesList">
            <Panel.Heading>
              <h3>Slides</h3>
            </Panel.Heading>
            <ListGroup>{this.renderSlidesList()}</ListGroup>
          </Panel>
          {this.renderCurrentSlide()}
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default SlidesPage;

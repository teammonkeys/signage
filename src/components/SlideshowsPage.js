import React from "react";
import Slide from "./Slide";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import EditSlidePage from "./EditSlidePage";

class SlideshowsPage extends React.Component {
  state = {
    currentSlideshow: null,
    isEditing: false
  };

  setCurrentSlideshow = index => {
    this.setState({
      currentSlideshow: this.state.slideshows[index]
    });
  };

  renderSlides = () => {
    const slides = [];
    this.props.slides.forEach((slide, index) => {
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
    const curSlide = this.props.currentSlide;
    if (curSlide === null) return null;
    return (
      <div className="slidePreview">
        <Slide
          {...this.props}
          key={curSlide.index}
          index={curSlide.index}
          isDraggable={false}
          isResizeable={false}
          layout={curSlide.layout}
        />
      </div>
    );
  };

  renderSlidesList = index => {
    const curSlideshow = this.props.currentSlideshow;
    if (curSlideshow === null) return null;
    else {
      const slidesList = [];
      curSlideshow.slides.forEach((slide, index) => {
        slidesList.push(
          <ListGroupItem
            key={index}
            onClick={() => this.props.setCurrentSlide(slide.index)}
          >
            {curSlideshow.slides[index].name}
          </ListGroupItem>
        );
      });
      return slidesList;
    }
  };

  renderSlideshowsList = () => {
    const slideshowsList = [];
    this.props.slideshows.forEach((slideshow, index) => {
      slideshowsList.push(
        <ListGroupItem
          key={index}
          onClick={() => this.props.setCurrentSlideshow(index)}
        >
          {this.props.slideshows[index].name}
        </ListGroupItem>
      );
    });
    return slideshowsList;
  };

  renderButtons = () => {
    if (this.props.currentSlide !== null) {
      return <button onClick={this.props.toggleIsEditing}>Edit slide</button>;
    }
  };

  render() {
    if (this.props.isEditing) {
      return (
        <div className="slide">
          <EditSlidePage
            {...this.props}
            key={this.props.currentSlide.index}
            index={this.props.currentSlide.index}
            layout={this.props.currentSlide.layout}
            toggleIsEditing={this.props.toggleIsEditing}
          />
        </div>
      );
    } else {
      return (
        <span>
          <div className="slidesPage">
            <Panel className="slidesList">
              <Panel.Heading>
                <h3>Slideshows</h3>
              </Panel.Heading>
              <ListGroup>{this.renderSlideshowsList()}</ListGroup>
            </Panel>
          </div>
          <div className="slidesPage">
            <Panel className="slidesList">
              <Panel.Heading>
                <h3>Slides</h3>
              </Panel.Heading>
              <ListGroup>{this.renderSlidesList()}</ListGroup>
            </Panel>
            {this.renderCurrentSlide()}
            {this.renderButtons()}
          </div>
        </span>
      );
    }
  }
}

export default SlideshowsPage;

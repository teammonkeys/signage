import React from "react";
import Slide from "./Slide";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import EditSlidePage from "./EditSlidePage";

class SlidesPage extends React.Component {
  state = {
    isEditing: false
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
    const currentSlide = this.props.currentSlide;
    if (currentSlide === null) return null;
    return (
      <div className="slidePreview">
        <Slide
          {...this.props}
          key={currentSlide.index}
          index={currentSlide.index}
          isDraggable={false}
          isResizeable={false}
          layout={currentSlide.layout}
        />
      </div>
    );
  };

  renderSlidesList = () => {
    const slidesList = [];
    this.props.slides.forEach((slide, index) => {
      slidesList.push(
        <ListGroupItem
          key={index}
          onClick={() => this.props.setCurrentSlide(index)}
        >
          {this.props.slides[index].name}
        </ListGroupItem>
      );
    });
    return slidesList;
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
          <Slide
            {...this.props}
            key={this.props.currentSlide.index}
            index={this.props.currentSlide.index}
            layout={this.props.currentSlide.layout}
          />
        </div>
      );
    } else {
      return (
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
      );
    }
  }
}

export default SlidesPage;

/*
ref={RGL => {
  this.RGL = RGL;
}}
createElement={this.props.createElement}
onLayoutChange={this.props.onLayoutChange}
slides={this.props.slides}
layout={this.props.slides[index].layout}
cols={this.props.cols}
newCounter={this.props.newCounter}
width={this.props.width}
maxRows={this.props.maxRows}
compactType={this.props.compactType}
preventCollision={this.props.preventCollision}
margin={this.props.margin}
numZones={this.props.numZones}
autoSize={this.props.autoSize}
rowHeight={this.props.rowHeight}
content={this.props.content}
*/

import React from "react";
import DisplaySlide from "./DisplaySlide";

class PlayPage extends React.Component {
  state = {
    currSlideIndex: 0,
    numSlides: this.props.slides.length,
    contentType: "sp"
  };

  updateSlide = () => {
    let index = this.state.currSlideIndex;
    if (index >= this.state.numSlides - 1) {
      index = 0;
    } else {
      index += 1;
    }
    this.setState({
      currSlideIndex: index
    });
  };

  componentDidMount = () => {
    setInterval(this.updateSlide, this.props.transitionTime);
  };

  render() {
    let index = this.state.currSlideIndex;
    let currSlide = this.props.slides[index];
    return (
      <React.Fragment>
        <div className="slide">
          <DisplaySlide
            {...this.props}
            {...this.state}
            key={this.state.currSlideIndex}
            slideIndex={this.state.currSlideIndex}
            currentSlide={currSlide}
            layout={currSlide.layout}
            //contentType={this.state.contentType}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default PlayPage;

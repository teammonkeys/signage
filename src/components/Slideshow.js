import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import ReactGridLayout from "react-grid-layout";

class App extends React.Component {
  state = {
    slides: []
  };

  addSlide = key => {
    const slides = { ...this.state.slides };
    slides.push();
  };

  render() {
    const dimensions = [{ cols: 12, rowHeight: 30, width: 1200 }];
    <ul>
      {Object.keys(this.state.slides).map(key => (
        <Slide
          key={key}
          index={key}
          cols={dimensions[cols]}
          rowHeight={dimensions[rowHeight]}
          width={dimensions[width]}
        />
      ))}
    </ul>;
  }
}

export default App;

import React from "react";
import "../css/Zone.css";
import ReactGridLayout from "react-grid-layout";

class Zone extends React.Component {
  state = {
    content: null
  };

  componentDidUpdate() {
    console.log("dook");
  }

  alerty() {
    alert("dook");
  }

  render() {
    return (
      <div className="content">
        <ReactGridLayout
          className="layout"
          layout={this.layout}
          cols={12}
          rowHeight={this.props.h}
          width={this.props.w}
        >
          <div className="zone" key="a">
            a
          </div>
        </ReactGridLayout>
      </div>
    );
  }
}

export default Zone;

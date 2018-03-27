import React from "react";
import ReactGridLayout from "react-grid-layout";
import _ from "lodash";
import "../css/SlidePage.css";

class EditSlidePage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ReactGridLayout
            ref={RGL => {
              this.RGL = RGL;
            }}
            onLayoutChange={() => this.props.onLayoutChange(this.RGL)}
            {...this.props}
          >
            {_.map(this.props.layout, newZone =>
              this.props.createElement(newZone)
            )}
          </ReactGridLayout>
        </div>
        <button onClick={this.props.addZone}>Add Item</button>
      </div>
    );
  }
}

export default EditSlidePage;

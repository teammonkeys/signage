import React from "react";
import { Button, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

class SettingsPage extends React.Component {
  //timeRef = React.createRef();

  handleChange = event => {
    event.preventDefault();
    let time = parseFloat(event.target.value) * 1000;
    if (isNaN(time)) {
      time = 5000; /// if input is invalid, set transition time to default transition time
    }
    //console.log(time);
    //comment
    this.props.setTransitionTime(time);
  };

  render() {
    return (
      <div>
        <div className="slidesPage">
          <Panel className="slidesList">
            <Panel.Heading>
              <h3>Transition Time</h3>
            </Panel.Heading>
            <label> Transition time: </label>
            <input
              onChange={this.handleChange.bind(this)}
              name="time"
              type="text"
              //ref={this.timeRef}
              placeholder={this.props.transitionTime / 1000}
            />
            <label> seconds </label>
          </Panel>
        </div>
      </div>
    );
  }
}

export default SettingsPage;

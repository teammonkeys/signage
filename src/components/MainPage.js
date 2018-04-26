import React from "react";
import MainPageItem from "./MainPageItem";
import MainPageExit from "./MainPageExit";
import { Grid, Row, Col } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";

class MainPage extends React.Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid" key={0}>
          <Col key={0} lg={2}>
            <MainPageItem
              key={0}
              page={this.props.pages[0]}
              icon={this.props.icons[0]}
              setPage={this.props.setPage}
            />
          </Col>
          <Col key={1} lg={2}>
            <MainPageItem
              key={1}
              page={this.props.pages[1]}
              icon={this.props.icons[1]}
              setPage={this.props.setPage}
            />
          </Col>
        </Row>
        <Row className="show-grid" key={1}>
          <Col key={2} lg={2}>
            <MainPageItem
              key={2}
              page={this.props.pages[2]}
              icon={this.props.icons[2]}
              setPage={this.props.setPage}
            />
          </Col>
          <Col key={3} lg={2}>
            <MainPageItem
              key={3}
              page={this.props.pages[3]}
              icon={this.props.icons[3]}
              setPage={this.props.setPage}
            />
          </Col>
          <Col key={4} lg={2}>
            <MainPageItem
              key={4}
              page={this.props.pages[4]}
              icon={this.props.icons[4]}
              setPage={this.props.setPage}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default MainPage;

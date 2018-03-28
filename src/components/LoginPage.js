import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Login.css";

class LoginPage extends React.Component {
  validateFields = event => {
    event.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    if (username === "admin" && password === "admin") {
      this.props.history.push(`/main`);
    } else {
      alert("Invalid. Username/Password is admin/admin");
    }
  };

  render() {
    return (
      <Form horizontal className="login" onSubmit={this.validateFields}>
        <FormGroup controlId="username">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              inputRef={ref => (this.usernameInput = ref)}
              placeholder="Username"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="password">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              inputRef={ref => (this.passwordInput = ref)}
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginPage;

/*
  
  username = React.createRef();
  password = React.createRef();

  login = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const username = this.myUsername.value.value;
    const password = this.myPassword.value.value;
  };

  render() {
    return (
      <form className="login" id="login" onSubmit={this.login}>
        <input type="text" ref={this.username} placeholder="Username" />
        <input type="text" ref={this.password} placeholder="Password" />
        <button type="submit">Log in</button>
      </form>
    );
  }
  */

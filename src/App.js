import React, { Component } from "react";
import { Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";

import logo from "./trello.png";
import Screen from "./components/Screen";

class App extends Component {
  state = { hasError: false };

  componentDidMount = () => {
    throw new Error("ERRO");
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  logout = () => {
    localStorage.clear("trello_token");
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <Router>
        <Header logout={this.logout} />
        <div className="container-fluid">
          {localStorage.getItem("trello_token") ? (
            <Screen />
          ) : (
            <Row>
              <Col xs={6} className="offset-3 text-center mt-3">
                <Card>
                  <CardImg
                    src={logo}
                    top
                    style={{ width: "216px", margin: "0 auto" }}
                  />
                  <CardBody>
                    <Login />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Router>
    );
  }
}

export default App;

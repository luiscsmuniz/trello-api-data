import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import View from "./View";

class Board extends Component {
  state = {
    board: [],
    loading: true,
    labels: [],
    view: null
  };

  componentDidMount = () => {
    this.board();
    this.labels();
  };

  loading = () => this.setState({ loading: true });

  board = async () => {
    await this.loading();

    const {
      match: {
        params: { board_id }
      }
    } = this.props;
    const response = await fetch(
      `https://api.trello.com/1/boards/${board_id}?key=${
        process.env.REACT_APP_KEY
      }&token=${localStorage.getItem("trello_token")}`
    );

    const board = await response.json();

    this.setState({ board, loading: false });
  };

  labels = async () => {
    await this.loading();
    const {
      match: {
        params: { board_id }
      }
    } = this.props;
    const response = await fetch(
      `https://api.trello.com/1/boards/${board_id}/labels?key=${
        process.env.API_KEY
      }&token=${localStorage.getItem("trello_token")}`
    );

    const labels = await response.json();

    this.setState({
      labels: labels.map(label => ({
        label: label.name,
        value: label.id
      })),
      loading: false
    });
  };

  setView = view => this.setState({ view });

  render() {
    const { board, loading, view, labels } = this.state;

    if (loading)
      return (
        <div className="mt-5" style={{ width: "100px", margin: "0 auto" }}>
          <ReactLoading type="spin" color="#007bff" />
        </div>
      );
    return (
      <>
        <Row>
          <Col xs={11}>
            <h3>
              <a href={board.url} target="_blank" rel="noopener noreferrer">
                {" "}
                {board.name}
              </a>
              <Button
                color="default"
                onClick={() => {
                  this.board();
                  this.labels();
                }}
              >
                <FontAwesomeIcon icon={faSyncAlt} />
              </Button>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem
                tag="a"
                href="#"
                onClick={() => {
                  this.setView("table");
                }}
                className="justify-content-between"
              >
                Tabela
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                href="#"
                onClick={() => {
                  this.setView("chart");
                }}
                className="justify-content-between"
              >
                Gráficos
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                href="#"
                onClick={() => {
                  this.setView("list");
                }}
                className="justify-content-between"
              >
                Listas
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col
            md={9}
            style={{
              maxHeight: "550px",
              minHeight: "550px",
              height: "550px",
              overflow: "auto"
            }}
          >
            <View board_id={board.id} view={view} labels={labels} />
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Board);

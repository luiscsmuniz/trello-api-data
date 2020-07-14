import React, { Component } from "react";
import { ListGroup, ListGroupItem, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

class Boards extends Component {
  state = {
    boards: [],
    loading: true
  };

  componentDidMount = () => {
    if (localStorage.getItem("trello_token")) this.boards();
  };

  boards = async () => {
    const response = await fetch(
      `https://api.trello.com/1/members/me/boards?key=${
        process.env.API_KEY
      }&token=${localStorage.getItem("trello_token")}`
    );

    const boards = await response.json();

    this.setState({ boards, loading: false });
  };

  render() {
    const { boards, loading } = this.state;

    if (loading)
      return (
        <div className="mt-5" style={{ width: "100px", margin: "0 auto" }}>
          <ReactLoading type="spin" color="#007bff" />
        </div>
      );
    return (
      <Row>
        <Col md={6} xs={12} className="offset-md-3 mt-3">
          <ListGroup>
            {boards.map(board => (
              <ListGroupItem
                tag={Link}
                to={`/board/${board.id}`}
                key={board.id}
              >
                {board.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Boards;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Boards from "./Boards";
import Board from "./Board";

class Screen extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route path="/board/:board_id" component={Board} />
      </Switch>
    );
  }
}

export default Screen;

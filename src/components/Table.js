import React, { Component } from "react";
import {
  Table as Tabela,
  Badge,
  Label,
  Col,
  FormGroup,
  Row,
  Button
} from "reactstrap";
import { DateTime } from "react-datetime-bootstrap";
import Select from "react-select";
import ReactLoading from "react-loading";

import { isEmptyOrNil } from "../utils/isEmptyOrNil";
import { api } from "../utils/key";

class Table extends Component {
  state = {
    cards: [],
    loading: true,
    dateTime: null,
    labels: null,
    apply: {
      dateTime: null,
      labels: null
    }
  };

  componentDidMount = () => this.cards();

  onChangeDate = dateTime =>
    this.setState({ dateTime: new Date(dateTime).getTime() });

  onChangeLabels = labels =>
    this.setState({
      labels: labels?.map(label => label.label)
    });

  cards = async () => {
    const { board_id } = this.props;
    const response = await fetch(
      `https://api.trello.com/1/boards/${board_id}/cards?key=${api}&token=${localStorage.getItem(
        "trello_token"
      )}`
    );

    const cards = await response.json();

    this.setState({ cards, loading: false });
  };

  onClick = () => {
    const { dateTime, labels } = this.state;

    this.setState({
      apply: {
        dateTime,
        labels
      }
    });
  };

  render() {
    const { cards, loading, apply, dateTime, labels } = this.state;

    var options = { year: "numeric", month: "numeric", day: "numeric" };

    if (loading)
      return (
        <div style={{ width: "100px", margin: "0 auto" }}>
          <ReactLoading type="spin" color="#007bff" />
        </div>
      );

    return (
      <>
        <Row>
          <Col md={5}>
            <FormGroup>
              <Label>A partir de:</Label>
              <br />
              <DateTime
                pickerOptions={{ format: "DD/MM/YYYY", locale: "pt" }}
                onChange={this.onChangeDate}
              />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label>Etiquetas:</Label>
              <Select
                isMulti
                name="colors"
                onChange={this.onChangeLabels}
                options={this.props.labels}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <div style={{ marginTop: "33px" }} />
            <Button
              disabled={isEmptyOrNil(labels) && isEmptyOrNil(dateTime)}
              color="success"
              onClick={this.onClick}
            >
              Aplicar
            </Button>
          </Col>
        </Row>
        <Tabela className="mt-1">
          <thead>
            <tr>
              <th>Data de criação</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Etiquetas</th>
            </tr>
          </thead>
          <tbody>
            {cards
              .filter(card => {
                if (apply.dateTime && isEmptyOrNil(apply.labels)) {
                  return (
                    parseInt(card.id.substring(0, 8), 16) >
                    apply.dateTime.toString().substr(0, 10)
                  );
                }

                if (isEmptyOrNil(apply.dateTime) && apply.labels) {
                  return apply.labels.some(label =>
                    card.labels.map(cardLabel => cardLabel.name).includes(label)
                  );
                }

                if (apply.dateTime && apply.labels) {
                  return (
                    parseInt(card.id.substring(0, 8), 16) >
                      apply.dateTime.toString().substr(0, 10) &&
                    apply.labels.some(label =>
                      card.labels
                        .map(cardLabel => cardLabel.name)
                        .includes(label)
                    )
                  );
                }

                return card;
              })
              .map(card => {
                const date = new Date(
                  1000 * parseInt(card.id.substring(0, 8), 16)
                );

                return (
                  <tr key={card.id}>
                    <td>{date.toLocaleDateString("pt-BR", options)}</td>
                    <td>{card.name}</td>
                    <td>
                      {card.dueComplete ? (
                        <Badge color="success">Entregue</Badge>
                      ) : (
                        <Badge color="danger">Pendente</Badge>
                      )}
                    </td>
                    <td>
                      {card.labels.map(label => (
                        <Badge
                          key={label.id}
                          className="mr-1"
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                        </Badge>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Tabela>
      </>
    );
  }
}

export default Table;

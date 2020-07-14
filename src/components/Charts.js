import React, { Component } from "react";
import { Label, Col, FormGroup, Row, Button } from "reactstrap";
import { DateTime } from "react-datetime-bootstrap";
import Select from "react-select";
import ReactLoading from "react-loading";

import { isEmptyOrNil } from "../utils/isEmptyOrNil";
import ChartView from "./ChartView";
import { api } from "../utils/key";

class Charts extends Component {
  state = {
    cards: [],
    loading: true,
    dateTime: null,
    labels: null,
    chart: null,
    apply: {
      dateTime: null,
      labels: null,
      chart: null
    }
  };

  componentDidMount = () => this.cards();

  onChangeDate = dateTime =>
    this.setState({ dateTime: new Date(dateTime).getTime() });

  onChangeLabels = labels =>
    this.setState({
      labels: labels?.map(label => label.label)
    });

  onChangeChart = chart =>
    this.setState({
      chart: chart.value
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
    const { dateTime, labels, chart } = this.state;

    this.setState({
      apply: {
        dateTime,
        labels,
        chart
      }
    });
  };

  render() {
    const { cards, loading, apply, chart, dateTime, labels } = this.state;

    if (loading)
      return (
        <div style={{ width: "100px", margin: "0 auto" }}>
          <ReactLoading type="spin" color="#007bff" />
        </div>
      );

    return (
      <>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label>A partir de:</Label>
              <br />
              <DateTime
                pickerOptions={{ format: "DD/MM/YYYY", locale: "pt" }}
                onChange={this.onChangeDate}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
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
          <Col md={3}>
            <FormGroup>
              <Label>Tipo de gráfico:</Label>
              <Select
                name="colors"
                onChange={this.onChangeChart}
                options={[
                  {
                    label: "Atividades por etiquetas",
                    value: "activities_labels"
                  },
                  {
                    label: "Percentual de atividades",
                    value: "percentage_activities"
                  },
                  {
                    label: "Tempo de execução de atividades entregues",
                    value: "time_activities"
                  }
                ]}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <div style={{ marginTop: "33px" }} />
            <Button
              disabled={
                isEmptyOrNil(labels) &&
                isEmptyOrNil(dateTime) &&
                isEmptyOrNil(chart)
              }
              color="success"
              onClick={this.onClick}
            >
              Aplicar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <ChartView
              options={apply}
              cards={cards}
              labels={this.props.labels}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Charts;

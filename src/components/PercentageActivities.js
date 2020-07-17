import React, { Component } from "react";
import Chart from "react-google-charts";
import { isEmptyOrNil } from "../utils/isEmptyOrNil";

class PercentageActivities extends Component {
  state = {
    pieChart: [],
    loading: true
  };

  componentDidMount = () => this.setData();

  componentDidUpdate = prevProps => {
    if (prevProps.options !== this.props.options) this.setData();
  };

  setData = () => {
    const { cards, options } = this.props;

    const complete = cards.filter(card => {
      if (options.dateTime && isEmptyOrNil(options.labels)) {
        return (
          card.dueComplete &&
          parseInt(card.id.substring(0, 8), 16) >
            options.dateTime.toString().substr(0, 10)
        );
      }

      if (isEmptyOrNil(options.dateTime) && options.labels) {
        return (
          card.dueComplete &&
          options.labels.some(label =>
            card.labels.map(cardLabel => cardLabel.name).includes(label)
          )
        );
      }

      if (options.dateTime && options.labels) {
        return (
          card.dueComplete &&
          parseInt(card.id.substring(0, 8), 16) >
            options.dateTime.toString().substr(0, 10) &&
          options.labels.some(label =>
            card.labels.map(cardLabel => cardLabel.name).includes(label)
          )
        );
      }

      return card.dueComplete ? card : null;
    }).length;

    const incomplete = cards.filter(card => {
      if (options.dateTime && isEmptyOrNil(options.labels)) {
        return (
          !card.dueComplete &&
          parseInt(card.id.substring(0, 8), 16) >
            options.dateTime.toString().substr(0, 10)
        );
      }

      if (isEmptyOrNil(options.dateTime) && options.labels) {
        return (
          !card.dueComplete &&
          options.labels.some(label =>
            card.labels.map(cardLabel => cardLabel.name).includes(label)
          )
        );
      }

      if (options.dateTime && options.labels) {
        return (
          !card.dueComplete &&
          parseInt(card.id.substring(0, 8), 16) >
            options.dateTime.toString().substr(0, 10) &&
          options.labels.some(label =>
            card.labels.map(cardLabel => cardLabel.name).includes(label)
          )
        );
      }

      return !card.dueComplete ? card : null;
    }).length;

    if (complete === 0 && incomplete === 0) {
      this.setState({
        piechart: [],
        loading: false
      });

      return undefined;
    }

    this.setState({
      pieChart: [["Entregue", complete], ["Pendente", incomplete]],
      loading: false
    });

    return undefined;
  };

  render() {
    const { loading, pieChart } = this.state;

    if (loading) return null;

    if (isEmptyOrNil(pieChart)) return <p>Não há dados para essa busca</p>;

    return (
      <div className="text-center">
        <Chart
          style={{
            margin: "0 auto",
            width: "100%",
            minHeight: "400px",
            maxHeight: "600px"
          }}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[["Label", "Atividades"], ...pieChart]}
          options={{
            title: "Atividades do Trello"
          }}
        />
      </div>
    );
  }
}

export default PercentageActivities;

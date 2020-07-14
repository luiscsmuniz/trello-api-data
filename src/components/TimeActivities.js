import React, { Component } from "react";
import Chart from "react-google-charts";
import ReactLoading from "react-loading";
import { isEmptyOrNil } from "../utils/isEmptyOrNil";
import { sortByCol } from "../utils/sortByCol";

class TimeActivities extends Component {
  state = {
    barChart: [],
    loading: true
  };

  componentDidMount = () => this.setData();

  componentDidUpdate = prevProps => {
    if (prevProps.options !== this.props.options) this.setData();
  };

  setData = () => {
    const { cards, options } = this.props;

    const barChart = cards
      .filter(card => {
        if (!isEmptyOrNil(options.labels) && !isEmptyOrNil(options.dateTime)) {
          return (
            parseInt(card.id.substring(0, 8), 16) >
              options.dateTime.toString().substr(0, 10) &&
            card.dueComplete &&
            options.labels.some(label =>
              card.labels.map(cardLabel => cardLabel.name).includes(label)
            )
          );
        }

        if (!isEmptyOrNil(options.labels)) {
          return (
            card.dueComplete &&
            options.labels.some(label =>
              card.labels.map(cardLabel => cardLabel.name).includes(label)
            )
          );
        }

        if (!isEmptyOrNil(options.dateTime)) {
          return (
            parseInt(card.id.substring(0, 8), 16) >
              options.dateTime.toString().substr(0, 10) && card.dueComplete
          );
        }

        return card.dueComplete;
      })
      .map(card => {
        const created_at = new Date(
          1000 * parseInt(card.id.substring(0, 8), 16)
        );
        const dued_at = new Date(card.due);
        const days = Math.ceil(
          (dued_at.getTime() - created_at.getTime()) / (1000 * 3600 * 24)
        );

        return [card.name, days, days];
      });

    sortByCol(barChart, 1);

    this.setState({
      barChart,
      loading: false
    });
  };

  render() {
    const { loading, barChart } = this.state;

    if (loading) return null;

    if (isEmptyOrNil(barChart)) return <p>Não há dados para essa busca</p>;

    return (
      <Chart
        width={"700px"}
        height={"400px"}
        chartType="BarChart"
        style={{ margin: "0 auto" }}
        loader={<div>Loading Chart</div>}
        data={[
          [
            "Atividades entregues",
            "Quantidade de dias",
            { role: "annotation" }
          ],
          ...barChart
        ]}
        options={{
          title: "Tempo de execução das atividades entregues",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Quantidade de dias das atividades",
            minValue: 0
          },
          vAxis: {
            title: "Atividades"
          }
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}

export default TimeActivities;

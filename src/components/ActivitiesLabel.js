import React, { Component } from "react";
import Chart from "react-google-charts";
import { isEmptyOrNil } from "../utils/isEmptyOrNil";

class ActivitiesLabel extends Component {
  state = {
    barChart: [],
    loading: true
  };

  componentDidMount = () => this.setData();

  componentDidUpdate = prevProps => {
    if (prevProps.options !== this.props.options) this.setData();
  };

  setData = () => {
    const { cards, options, labels } = this.props;

    let barChart;

    if (!isEmptyOrNil(options.labels)) {
      barChart = options.labels.map(label => {
        const complete = cards
          .filter(card => {
            if (!isEmptyOrNil(options.dateTime)) {
              return (
                card.dueComplete &&
                parseInt(card.id.substring(0, 8), 16) >
                  options.dateTime.toString().substr(0, 10) &&
                card.labels.map(label => label.name).includes(label)
              );
            }

            return (
              card.dueComplete &&
              card.labels.map(label => label.name).includes(label)
            );
          })
          .map(card => card).length;

        const incomplete = cards
          .filter(card => {
            if (!isEmptyOrNil(options.dateTime)) {
              return (
                !card.dueComplete &&
                parseInt(card.id.substring(0, 8), 16) >
                  options.dateTime.toString().substr(0, 10) &&
                card.labels.map(label => label.name).includes(label)
              );
            }

            return (
              !card.dueComplete &&
              card.labels.map(label => label.name).includes(label)
            );
          })
          .map(card => card).length;

        return [label, complete, complete, incomplete, incomplete];
      });
    } else {
      barChart = labels.map(label => {
        const complete = cards
          .filter(card => {
            if (!isEmptyOrNil(options.dateTime)) {
              return (
                card.dueComplete &&
                parseInt(card.id.substring(0, 8), 16) >
                  options.dateTime.toString().substr(0, 10) &&
                card.labels.map(label => label.name).includes(label.label)
              );
            }

            return (
              card.dueComplete &&
              card.labels.map(label => label.name).includes(label.label)
            );
          })
          .map(card => card).length;

        const incomplete = cards
          .filter(card => {
            if (!isEmptyOrNil(options.dateTime)) {
              return (
                !card.dueComplete &&
                parseInt(card.id.substring(0, 8), 16) >
                  options.dateTime.toString().substr(0, 10) &&
                card.labels.map(label => label.name).includes(label.label)
              );
            }

            return (
              !card.dueComplete &&
              card.labels.map(label => label.name).includes(label.label)
            );
          })
          .map(card => card).length;

        return [label.label, complete, complete, incomplete, incomplete];
      });
    }

    if (
      barChart.map(value => {
        if (value[1] !== 0 || value[3] !== 0) {
          return true;
        }

        return false;
      })[0]
    ) {
      this.setState({
        barChart,
        loading: false
      });

      return undefined;
    }

    this.setState({
      barChart: [],
      loading: false
    });

    return undefined;
  };

  render() {
    const { loading, barChart } = this.state;

    if (loading) return null;

    if (isEmptyOrNil(barChart)) return <p>Não há dados para essa busca</p>;

    return (
      <div className="text-center">
        <Chart
          width={"700px"}
          height={"400px"}
          chartType="BarChart"
          style={{ margin: "0 auto" }}
          loader={<div>Loading Chart</div>}
          data={[
            [
              "Etiquetas",
              "Atividades Entregues",
              { role: "annotation" },
              "Atividades Pendentes",
              { role: "annotation" }
            ],
            ...barChart
          ]}
          options={{
            title: "Atividades por Etiqueta",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Atividades",
              minValue: 0
            },
            vAxis: {
              title: "Etiquetas"
            }
          }}
        />
      </div>
    );
  }
}

export default ActivitiesLabel;

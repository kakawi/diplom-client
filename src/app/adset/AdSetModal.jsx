import React from 'react';
import {Dimmer, Loader, Modal} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Input, Container, Button, Icon} from 'semantic-ui-react'
import {linearApproximation, logarithmApproximation} from "../common/approximations";

class AdSetModal extends React.Component {
  state = {
    newValue: null,
  };

  componentDidMount() {
    this.props.requestOneAdSet(this.props.id);
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      newValue: value
    }))
  };

  render() {
    const {
      modalAdSet,
      modalLoading,
      open,
      onCloseClick,
      onUpdateClick
    } = this.props;
    let result;
    if (modalLoading) {
      result = (
        <Modal.Content>
          <Dimmer active>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Modal.Content>
      )
    } else {
      const {
        id,
        name,
        impressionsHistory,
        clicksHistory,
        costHistory,
        currentValue
      } = modalAdSet;

      const linearFunction = costHistory === undefined ? x => x : linearApproximation(costHistory, impressionsHistory);
      const logarithmFunction = costHistory === undefined ? x => x : logarithmApproximation(costHistory, impressionsHistory);
      const impressionsLinear = costHistory === undefined ? undefined : costHistory.map(cost => linearFunction(cost));
      const impressionsLogarithm = costHistory === undefined ? undefined : costHistory.map(cost => logarithmFunction(cost));

      const options = {
        title: {
          text: `AdSet: ${name}`
        },
        xAxis: {
          allowDecimals: false,
          labels: false,
          title: {
            text: 'Weeks'
          }
        },
        yAxis: {
          title: {
            text: 'Dollars'
          }
        },
        series: [
          {
            name: 'Impressions',
            data: impressionsHistory
          },
          {
            name: 'Clicks',
            data: clicksHistory
          },
          {
            name: 'Cost',
            data: costHistory
          },
          {
            name: 'Linear Approximation',
            data: impressionsLinear,
            dashStyle: 'dash'
          },
          {
            name: 'Logarithm Approximation',
            data: impressionsLogarithm,
            dashStyle: 'dot'
          }
        ]
      };

      const currentValueModal = this.state.newValue || currentValue;
      const suggestCost = 999;

      result = (
        <Modal.Content>
          <Container>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
            <div>
              Current Cost: {currentValue}$
            </div>
            <div>
              Suggest Cost: {suggestCost}$
            </div>
            <Input
              onChange={(e) => this.handleInput(e)}
              value={currentValueModal}
            >
            </Input>
          </Container>
        </Modal.Content>
      )
    }

    return (
      <Modal
        open={open}
        onClose={onCloseClick}
      >
        {result}

        <Modal.Actions>
          <Button basic color='red' onClick={onCloseClick}>
            <Icon name='remove'/> Cancel
          </Button>
          <Button color='green' onClick={() => onUpdateClick(this.state.newValue)}>
            <Icon name='checkmark'/> Update
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AdSetModal

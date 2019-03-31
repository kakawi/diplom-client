import React from 'react';
import {Dimmer, Loader, Modal} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Input, Container, Button, Icon, Dropdown} from 'semantic-ui-react'
import {linearApproximation, logarithmApproximation} from "../common/approximations";

class CampaignModal extends React.Component {
  state = {
    newValue: null,
    approximationDropdownValue: 'linear',
    parameterDropdownValue: 'impressions'
  };

  componentDidMount() {
    this.props.requestOneCampaign(this.props.id);
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      newValue: value
    }))
  };

  handleApproximationDropdownChange = (e, {value}) => {
    this.setState(() => ({
      approximationDropdownValue: value
    }));
  };

  handleParameterDropdownChange = (e, {value}) => {
    this.setState(() => ({
      parameterDropdownValue: value
    }));
  };

  render() {
    const {
      modalCampaign,
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
        campaignStatistics
      } = modalCampaign;
      const impressionsHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
        return statistic.impressions
      });
      const clicksHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
        return statistic.clicks
      });
      const costHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
        return statistic.spends
      });

      let valuesForApproximation;
      if (this.state.parameterDropdownValue === 'impressions') {
        valuesForApproximation = impressionsHistory;
      } else {
        valuesForApproximation = clicksHistory;
      }

      let approximatedFunction;
      if (this.state.approximationDropdownValue === 'linear') {
        approximatedFunction = costHistory === undefined ? x => x : linearApproximation(costHistory, valuesForApproximation);
      } else {
        approximatedFunction = costHistory === undefined ? x => x : logarithmApproximation(costHistory, valuesForApproximation);
      }
      let withNewValue = undefined;
      if (costHistory) {
        withNewValue = costHistory.concat(this.state.newValue)
      }
      const approximatedValues = withNewValue === undefined ? undefined : withNewValue.map(cost => approximatedFunction(cost));
      const resultNewValue = withNewValue === undefined ? undefined : approximatedFunction(this.state.newValue);

      const options = {
        title: {
          text: `Campaign: ${name}`
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
            name: 'Spends',
            data: costHistory
          },
          {
            name: 'Approximation',
            data: approximatedValues,
            dashStyle: 'dash'
          }
        ]
      };

      const approximationOptions = [
        {
          key: 1,
          text: 'Linear Approximation',
          value: 'linear',
        },
        {
          key: 2,
          text: 'Logarithm Approximation',
          value: 'logarithm',
        }
      ];

      const parameterOptions = [
        {
          key: 1,
          text: 'Impressions',
          value: 'impressions',
        },
        {
          key: 2,
          text: 'Clicks',
          value: 'clicks',
        }
      ];

      const currentValue = 1;
      const currentValueModal = this.state.newValue || currentValue;
      const suggestCost = 999;

      result = (
        <Modal.Content>
          <Container>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
            <Container>
              <Input
                onChange={(e) => this.handleInput(e)}
                value={currentValueModal}
              />
              <div>Result value {Math.round(resultNewValue)}</div>
            </Container>
            <Container>
              <Dropdown
                options={approximationOptions}
                value={this.state.approximationDropdownValue}
                onChange={this.handleApproximationDropdownChange}
              />
              <Dropdown
                options={parameterOptions}
                value={this.state.parameterDropdownValue}
                onChange={this.handleParameterDropdownChange}
              />
            </Container>
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

export default CampaignModal

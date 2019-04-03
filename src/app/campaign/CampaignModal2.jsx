import React from 'react';
import {Dimmer, Loader, Modal} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Input, Container, Button, Icon, Dropdown} from 'semantic-ui-react'
import {linearApproximation, logarithmApproximation} from "../common/approximations";

function suggestValue(spendHistory, sellHistory) {
  const countOfNumber = spendHistory.length;
  let bestSpend = spendHistory[countOfNumber - 1];
  let bestSell = sellHistory[countOfNumber - 1];
  let bestRate = bestSpend / bestSell;
  for (let i = 0; i < countOfNumber; i++) {
    if (spendHistory[i] / sellHistory[i] < bestRate && sellHistory[i] > bestSell) {
      bestSpend = spendHistory[i];
      bestSell = sellHistory[i];
      bestRate = bestSpend / bestSell;
    }
  }
  return bestSpend;
}

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
      if (campaignStatistics === undefined) {
        result = <Modal.Content>
          <div>No data...</div>
        </Modal.Content>
      } else {
        const impressionsHistory = campaignStatistics.map(statistic => {
          return statistic.impressions
        });
        const clicksHistory = campaignStatistics.map(statistic => {
          return statistic.clicks
        });
        const spendHistory = campaignStatistics.map(statistic => {
          return statistic.spends
        });
        const sellHistory = campaignStatistics.map(statistic => {
          return statistic.sells
        });

        let valuesForApproximation;
        if (this.state.parameterDropdownValue === 'impressions') {
          valuesForApproximation = impressionsHistory;
        } else {
          valuesForApproximation = clicksHistory;
        }

        let approximatedFunction;
        if (this.state.approximationDropdownValue === 'linear') {
          approximatedFunction = linearApproximation(spendHistory, valuesForApproximation);
        } else {
          approximatedFunction = logarithmApproximation(spendHistory, valuesForApproximation);
        }

        const suggestedValue = suggestValue(spendHistory, sellHistory);

        const currentValueModal = this.state.newValue || suggestedValue;
        let withNewValue = spendHistory.concat(currentValueModal);
        const approximatedValues = withNewValue.map(cost => Math.round(approximatedFunction(cost)));
        const resultNewValue = approximatedFunction(currentValueModal);

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
              data: clicksHistory,
              color: '#ec28d8'
            },
            {
              name: 'Spends',
              data: spendHistory,
              color: '#FF0000'
            },
            {
              name: 'Sells',
              data: sellHistory,
              color: '#90EC7E'
            },
            {
              name: 'Approximation',
              data: approximatedValues,
              dashStyle: 'dash',
              color: '#eccd0e'
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

        result = (
          <Modal.Content>
            <Container>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
              <Container>
                <div>
                  Suggest value: {suggestedValue}
                </div>
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

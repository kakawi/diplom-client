import React from 'react';
import {Dimmer, Loader, Modal} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Input, Container, Button, Icon} from 'semantic-ui-react'

class CampaignModal extends React.Component {
  state = {
    newValue: null,
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
        impressionsHistory,
        clicksHistory,
        costHistory,
        currentValue
      } = modalCampaign;
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
            name: 'Cost',
            data: costHistory
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

export default CampaignModal

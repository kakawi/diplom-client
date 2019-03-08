import React from 'react';
import {Modal} from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Input, Container, Button, Icon} from 'semantic-ui-react'

class CampaignModal extends React.Component {
  state = {
    newValue: 0,
  };

  componentDidMount() {
    // this.props.requestCurrentValue();
  }

  handleInput = (e) => {
    const value = e.target.value;
    this.setState(() => ({
      newValue: value
    }))
  };

  render() {
    const {
      campaign,
      open,
      onCloseClick,
      onUpdateClick
    } = this.props;
    const {
      id,
      name,
      impressionsHistory,
      clicksHistory,
      costHistory
    } = campaign;
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
      series: [{
        showInLegend: false,
        data: costHistory
      }]
    };
    const currentCost = 1000000;
    const suggestCost = 999;
    return (
      <Modal
        open={open}
        onClose={onCloseClick}
        closeIcon
      >
        <Modal.Content>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
          <Container>
            <div>
              Current Cost: {currentCost}$
            </div>
            <div>
              Suggest Cost: {suggestCost}$
            </div>
            <Input
              onChange={(e) => this.handleInput(e)}
              value={this.state.newValue}
            >
              {/*<Label>$</Label>*/}
            </Input>
          </Container>

        </Modal.Content>
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

export default CampaignModal;
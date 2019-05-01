import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Container, Button, Grid, Dropdown} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

function convertToDay(dayPeriod) {
  const date = new Date(dayPeriod.period * 1000);
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}

function convertToWeek(weekPeriod) {
  return weekPeriod.period;
}

class CampaignConstructorHighchart extends React.Component {
  state = {
    campaignId: undefined,
    periodType: undefined,
    startDate: '',
    endDate: ''
  };

  handleChange = (e, {name, value}) => {
    this.setState(() => ({
      [name]: value
    }), this.sendRequest);
  };

  shouldMakeNewRequest = () => {
    const {campaignId, periodType, startDate, endDate} = this.state;
    return campaignId && periodType && startDate && endDate;
  };

  sendRequest = () => {
    if (this.shouldMakeNewRequest()) {
      const {campaignId, periodType, startDate, endDate} = this.state;
      this.props.requestConstructorCampaign(
        campaignId,
        periodType,
        startDate,
        endDate
      );
    }
  };

  render() {
    const {campaignConstructorData, allCampaigns} = this.props;
    let result;
    if (campaignConstructorData.loading) {
      result = (<div>Loading...</div>);
    } else {
      const {
        data,
      } = campaignConstructorData;
      if (data === undefined) {
        result = (<div>No data...</div>);
      } else {
        const {name, statistic} = data;
        const {type, campaignStatistics} = statistic;
        const impressionsHistory = campaignStatistics.map(statistic => {
          return statistic.impressions
        });
        const clicksHistory = campaignStatistics.map(statistic => {
          return statistic.clicks
        });
        const spendHistory = campaignStatistics.map(statistic => {
          return statistic.spends
        });
        const period = campaignStatistics.map(statistic => {
          switch (type) {
            case 'DAY':
              return convertToDay(statistic.period);
            case 'WEEK':
              return convertToWeek(statistic.period);
            default:
              return statistic.period.period
          }
        });

        const options = {
          title: {
            text: `Campaign: ${name}`
          },
          xAxis: {
            allowDecimals: false,
            labels: {
              enabled: true,
              formatter: function ({pos}) {
                return period[pos]
              },
            },
            title: {
              text: `${type}`
            }
          },
          yAxis: {
            title: {
              text: 'Numbers'
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
            }
          ]
        };

        result = (
          <Container>
            <Container>

            </Container>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </Container>
        )
      }
    }

    const campaignsDropdownOptions = allCampaigns.data.map(campaign => {
      return {
        key: campaign.id,
        text: campaign.name,
        value: campaign.id
      }
    });
    const periodTypeDropdownOptions = [
      {
        key: 1,
        text: 'DAY',
        value: 'DAY'
      },
      {
        key: 2,
        text: 'WEEK',
        value: 'WEEK'
      },
      {
        key: 3,
        text: 'MONTH',
        value: 'MONTH'
      },
    ];

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Dropdown
              name="campaignId"
              placeholder="Select Campaign"
              options={campaignsDropdownOptions}
              value={this.state.campaignId}
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              name="periodType"
              placeholder="Select Period Type"
              options={periodTypeDropdownOptions}
              value={this.state.periodType}
              onChange={this.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DateInput
              dateFormat="YYYY-MM-DD"
              name="startDate"
              placeholder="Start Date"
              value={this.state.startDate}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Column>
            <DateInput
              dateFormat="YYYY-MM-DD"
              name="endDate"
              placeholder="End Date"
              value={this.state.endDate}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            {result}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CampaignConstructorHighchart

import React from 'react';
import {Table} from 'semantic-ui-react'
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';

class CampaignRow extends React.Component {
  render() {
    const {
      id,
      name,
      campaignStatistics,
      onRowClick
    } = this.props;
    const impressionsHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
      return statistic.impressions
    });
    const clicksHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
      return statistic.clicks
    });
    const spendsHistory = campaignStatistics === undefined ? [] : campaignStatistics.map(statistic => {
      return statistic.spends
    });
    return (
      <Table.Row
        onClick={onRowClick}
      >
        <Table.Cell collapsing>
          {id}
        </Table.Cell>
        <Table.Cell>
          {name}
        </Table.Cell>
        <Table.Cell width={3}>
          <Sparklines
            data={impressionsHistory}
          >
            <SparklinesLine color="blue"/>
          </Sparklines>
        </Table.Cell>
        <Table.Cell width={3}>
          <Sparklines data={clicksHistory}>
            <SparklinesLine color="blue"/>
          </Sparklines>
        </Table.Cell>
        <Table.Cell width={3}>
          <Sparklines data={spendsHistory}>
            <SparklinesLine color="blue"/>
            <SparklinesReferenceLine type="mean"/>
          </Sparklines>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default CampaignRow;
import React from 'react';
import {Table} from 'semantic-ui-react'
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';

class CampaignRow extends React.Component {
  render() {
    const {
      id,
      name,
      impressionsHistory,
      clicksHistory,
      costHistory,
      onRowClick
    } = this.props;
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
          <Sparklines data={costHistory}>
            <SparklinesLine color="blue"/>
            <SparklinesReferenceLine type="mean"/>
          </Sparklines>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default CampaignRow;
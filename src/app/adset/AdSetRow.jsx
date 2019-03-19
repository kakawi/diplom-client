import React from 'react';
import {Table} from 'semantic-ui-react'
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';
import {linearApproximation, logarithmApproximation} from '../common/approximations';

class AdSetRow extends React.Component {
  render() {
    const {
      id,
      name,
      impressionsHistory,
      clicksHistory,
      costHistory,
      onRowClick
    } = this.props;
    const linearFunction = linearApproximation(costHistory, impressionsHistory);
    const logarithmFunction = logarithmApproximation(costHistory, impressionsHistory);
    const impressionsLinear = costHistory.sort((a, b) => a - b).map(cost => linearFunction(cost));
    const impressionsLogarithm = costHistory.sort((a, b) => a - b).map(cost => logarithmFunction(cost));
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
        <Table.Cell>
          <Sparklines
            data={impressionsLinear}
          >
            <SparklinesLine color="black"/>
          </Sparklines>
        </Table.Cell>
        <Table.Cell>
          <Sparklines
            data={impressionsLogarithm}
          >
            <SparklinesLine color="green"/>
          </Sparklines>

        </Table.Cell>
      </Table.Row>
    )
  }
}

export default AdSetRow;
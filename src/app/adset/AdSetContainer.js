import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {Table, Loader, Dimmer} from 'semantic-ui-react'
import AdSetRow from './AdSetRow';
import actions from './duck/actions';
import {Container} from 'semantic-ui-react'
import AdSetModal from './AdSetModal';

class AdSetContainer extends React.Component {
  state = {
    modalAdSet: {},
    openModal: false
  };

  componentDidMount() {
    this.props.requestAdSets();
  }

  handleClickOnRow = (key) => {
    const {adSets} = this.props;
    const modalAdSet = adSets.find(adSet => adSet.id === key);
    this.setState(() => ({
      openModal: true,
      modalAdSet
    }))
  };
  handleClose = () => {
    this.setState(() => ({
      openModal: false
    }))
  };
  handleUpdate = (id, newValue) => {
    console.log("update id - " + id + " with value = " + newValue);
    this.handleClose();
  };

  render() {
    const {adSets, loading} = this.props;

    return (
      <Container>
        {
          loading
            ?
            <Dimmer active>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            :
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>AdSet name</Table.HeaderCell>
                  <Table.HeaderCell>Impressions</Table.HeaderCell>
                  <Table.HeaderCell>Clicks</Table.HeaderCell>
                  <Table.HeaderCell>Cost</Table.HeaderCell>
                  <Table.HeaderCell>Linear Approximation</Table.HeaderCell>
                  <Table.HeaderCell>Logarithm Approximation</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {adSets.map(adSet => <AdSetRow
                  key={adSet.id}
                  id={adSet.id}
                  name={adSet.name}
                  impressionsHistory={adSet.impressionsHistory}
                  clicksHistory={adSet.clicksHistory}
                  costHistory={adSet.costHistory}
                  onRowClick={() => this.handleClickOnRow(adSet.id)}
                />)}
              </Table.Body>
            </Table>
        }
        <AdSetModal
          id={this.state.modalAdSet.id}
          requestOneAdSet={this.props.requestOneAdSet}
          modalAdSet={this.props.modalAdSet}
          modalLoading={this.props.modalLoading}
          open={this.state.openModal}
          onCloseClick={this.handleClose}
          onUpdateClick={(newValue) => this.handleUpdate(this.state.modalAdSet.id, newValue)}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  adSets: state.adSets.items,
  loading: state.adSets.loading,
  modalAdSet: state.modalAdSet.item,
  modalLoading: state.modalAdSet.loading
});

const mapDispatchToProps = (dispatch) => ({
  requestAdSets: bindActionCreators(actions.requestAdSets, dispatch),
  requestOneAdSet: bindActionCreators(actions.requestOneAdSet, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdSetContainer)

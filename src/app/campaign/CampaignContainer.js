import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {Table, Loader, Dimmer} from 'semantic-ui-react'
import CampaignRow from './CampaignRow';
import actions from './duck/actions';
import {Container} from 'semantic-ui-react'
import CampaignModal2 from './CampaignModal2';

class CampaignContainer extends React.Component {
  state = {
    modalCampaign: undefined,
    openModal: false
  };

  componentDidMount() {
    this.props.requestCampaigns();
  }

  handleClickOnRow = (key) => {
    const {campaigns} = this.props;
    const modalCampaign = campaigns.find(campaign => campaign.id === key);
    this.setState(() => ({
      openModal: true,
      modalCampaign
    }))
  };
  handleClose = () => {
    this.setState(() => ({
      openModal: false,
      modalCampaign: undefined
    }))
  };
  handleUpdate = (id, newValue) => {
    console.log("update id - " + id + " with value = " + newValue);
    this.handleClose();
  };

  render() {
    const {campaigns, loading} = this.props;

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
                  <Table.HeaderCell>Campaign name</Table.HeaderCell>
                  <Table.HeaderCell>Impressions</Table.HeaderCell>
                  <Table.HeaderCell>Clicks</Table.HeaderCell>
                  <Table.HeaderCell>Spends</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {campaigns.map(campaign => <CampaignRow
                  key={campaign.id}
                  id={campaign.id}
                  name={campaign.name}
                  campaignStatistics={campaign.campaignStatistics}
                  onRowClick={() => this.handleClickOnRow(campaign.id)}
                />)}
              </Table.Body>
            </Table>
        }
        {this.state.modalCampaign ?
          <CampaignModal2
            id={this.state.modalCampaign.id}
            requestOneCampaign={this.props.requestOneCampaign}
            modalCampaign={this.props.modalCampaign}
            modalLoading={this.props.modalLoading}
            open={this.state.openModal}
            onCloseClick={this.handleClose}
            onUpdateClick={(newValue) => this.handleUpdate(this.state.modalCampaign.id, newValue)}
          />
          : <div></div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  campaigns: state.campaigns.items,
  loading: state.campaigns.loading,
  modalCampaign: state.modalCampaign.item,
  modalLoading: state.modalCampaign.loading
});

const mapDispatchToProps = (dispatch) => ({
  requestCampaigns: bindActionCreators(actions.requestCampaigns, dispatch),
  requestOneCampaign: bindActionCreators(actions.requestOneCampaign, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer)

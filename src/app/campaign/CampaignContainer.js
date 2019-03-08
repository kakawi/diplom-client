import React from 'react'
import {connect} from "react-redux";
import {Table, Loader, Dimmer} from 'semantic-ui-react'
import CampaignRow from './CampaignRow';
import actions from './duck/actions';
import {Container} from 'semantic-ui-react'
import CampaignModal from './CampaignModal';

class CampaignContainer extends React.Component {
  state = {
    modalCampaign: {},
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
      openModal: false
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
                  <Table.HeaderCell>Cost</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {campaigns.map(campaign => <CampaignRow
                  key={campaign.id}
                  id={campaign.id}
                  name={campaign.name}
                  impressionsHistory={campaign.impressionsHistory}
                  clicksHistory={campaign.clicksHistory}
                  costHistory={campaign.costHistory}
                  onRowClick={() => this.handleClickOnRow(campaign.id)}
                />)}
              </Table.Body>
            </Table>
        }
        <CampaignModal
          campaign={this.state.modalCampaign}
          open={this.state.openModal}
          onCloseClick={this.handleClose}
          onUpdateClick={(newValue) => this.handleUpdate(this.state.modalCampaign.id, newValue)}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  campaigns: state.campaigns.items,
  loading: state.campaigns.loading
});

const mapDispatchToProps = dispatch => ({
  requestCampaigns: () => dispatch(actions.requestCampaigns())
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer)

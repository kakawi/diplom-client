import React from 'react';
import {bindActionCreators} from 'redux'
import {Grid, Loader, Container} from 'semantic-ui-react'
import CampaignConstructorHighchart from './CampaignConstructorHighchart';
import actions from "./duck/actions";
import metadataActions from "./duck/metadata_actions";
import {connect} from "react-redux";

class CampaignConstructorModal extends React.Component {

  componentDidMount() {
    this.props.requestCampaignMetadata();
  }

  handleRequestConstructorCampaign = (constructorNumber) => {
    return (campaignId,
            periodType,
            startDate,
            endDate) => {
      this.props.requestConstructorCampaign(campaignId, periodType, startDate, endDate, constructorNumber);
    }
  };

  render() {
    let result;
    if (this.props.allCampaigns.loading) {
      result = (
        <Loader>Loading...</Loader>
      )
    } else {
      result = (
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <CampaignConstructorHighchart
                  requestConstructorCampaign={this.handleRequestConstructorCampaign(1)}
                  campaignConstructorData={this.props.campaignConstructor1}
                  allCampaigns={this.props.allCampaigns}
                />
              </Grid.Column>
              <Grid.Column>
                < CampaignConstructorHighchart
                  requestConstructorCampaign={this.handleRequestConstructorCampaign(2)}
                  campaignConstructorData={this.props.campaignConstructor2}
                  allCampaigns={this.props.allCampaigns}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      )
    }
    return (
      <Container>
        {result}
      </Container>
    )
  }

}

const mapStateToProps = (state) => ({
  campaignConstructor1: state.campaignConstructors.campaignConstructor1,
  campaignConstructor2: state.campaignConstructors.campaignConstructor2,
  allCampaigns: state.metadata.allCampaigns
});

const mapDispatchToProps = (dispatch) => ({
  requestConstructorCampaign: bindActionCreators(actions.requestConstructorCampaign, dispatch),
  requestCampaignMetadata: bindActionCreators(metadataActions.requestCampaignMetadata, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignConstructorModal)

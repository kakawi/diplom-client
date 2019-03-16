import types from './types';

function requestCampaigns() {
  return {
    type: types.REQUEST_CAMPAIGNS, payload: 99999
  }
}

function requestOneCampaign(id) {
  return {
    type: types.REQUEST_ONE_CAMPAIGN, payload: id
  }
}

export default {
  requestCampaigns,
  requestOneCampaign
}

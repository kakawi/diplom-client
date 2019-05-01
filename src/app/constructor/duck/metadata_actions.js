import types from './types';

function requestCampaignMetadata() {
  return {
    type: types.REQUEST_ALL_CAMPAIGNS_METADATA
  }
}

export default {
  requestCampaignMetadata,
}

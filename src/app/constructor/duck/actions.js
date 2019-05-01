import types from './types';

function requestConstructorCampaign(campaignId, periodType, startDate, endDate, constructorNumber) {
  return {
    type: types.REQUEST_CONSTRUCTOR_CAMPAIGN, payload: {
      campaignId,
      periodType,
      startDate,
      endDate,
      constructorNumber
    }
  }
}

export default {
  requestConstructorCampaign,
}

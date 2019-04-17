import types from './types';

function requestCampaigns(page, size) {
  return {
    type: types.REQUEST_CAMPAIGNS, payload: {
      page,
      size
    }
  }
}

function requestOneCampaign(id) {
  return {
    type: types.REQUEST_ONE_CAMPAIGN, payload: id
  }
}

function changePage(newPageNumber) {
  return {
    type: types.CHANGE_PAGE_NUMBER, payload: newPageNumber
  }
}

export default {
  requestCampaigns,
  requestOneCampaign,
  changePage
}

import types from './types';

const INITIAL_STATE = {
  allCampaigns: {
    loading: false,
    data: []
  }
};

const metadataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_ALL_CAMPAIGNS_METADATA: {
      return {
        ...state,
        allCampaigns: {
          loading: true,
          data: []
        }
      }
    }
    case types.RECEIVE_ALL_CAMPAIGNS_METADATA: {
      return {
        ...state,
        allCampaigns: {
          loading: false,
          data: action.data
        }
      }
    }
    default:
      return state;
  }
};

export default metadataReducer;

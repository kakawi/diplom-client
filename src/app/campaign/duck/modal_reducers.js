import types from './types';

const INITIAL_STATE = {
  item: {},
  loading: false
};

const campaignReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_ONE_CAMPAIGN: {
      return {
        ...state,
        item: {},
        loading: true
      }
    }
    case types.RECEIVE_ONE_CAMPAIGN: {
      const {data} = action;
      return {
        ...state,
        item: data,
        loading: false
      }
    }
    default:
      return state;
  }
};

export default campaignReducer;
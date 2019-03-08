import types from './types';

const INITIAL_STATE = {
  items: [],
  loading: false
};

const campaignReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_CAMPAIGNS: {
      return {
        ...state,
        items: [],
        loading: true
      }
    }
    case types.RECEIVE_CAMPAIGNS: {
      const {data} = action;
      return {
        ...state,
        items: data,
        loading: false
      }
    }
    default:
      return state;
  }
};

export default campaignReducer;
import types from './types';

const INITIAL_STATE = {
  item: {},
  loading: false
};

const adSetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_ONE_ADSET: {
      return {
        ...state,
        item: {},
        loading: true
      }
    }
    case types.RECEIVE_ONE_ADSET: {
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

export default adSetReducer;
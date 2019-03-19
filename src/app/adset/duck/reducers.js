import types from './types';

const INITIAL_STATE = {
  items: [],
  loading: false
};

const adSetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_ADSETS: {
      return {
        ...state,
        items: [],
        loading: true
      }
    }
    case types.RECEIVE_ADSETS: {
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

export default adSetReducer;
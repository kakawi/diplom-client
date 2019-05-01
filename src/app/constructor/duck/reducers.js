import types from './types';

const INITIAL_STATE = {
  campaignConstructor1: {
    loading: false,
    data: undefined
  },
  campaignConstructor2: {
    loading: false,
    data: undefined
  }
};

const campaignConstructorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_CONSTRUCTOR_CAMPAIGN: {
      const constructorNumber = action.payload.constructorNumber;
      if (constructorNumber === 1) {
        return {
          ...state,
          campaignConstructor1: {
            loading: true,
            data: undefined
          }
        }
      } else {
        return {
          ...state,
          campaignConstructor2: {
            loading: true,
            data: undefined
          }
        }
      }
    }
    case types.RECEIVE_CONSTRUCTOR_CAMPAIGN: {
      const {constructorNumber, data} = action.result;
      if (constructorNumber === 1) {
        return {
          ...state,
          campaignConstructor1: {
            loading: false,
            data
          }
        }
      } else {
        return {
          ...state,
          campaignConstructor2: {
            loading: false,
            data: data
          }
        }
      }
    }
    default:
      return state;
  }
};

export default campaignConstructorReducer;

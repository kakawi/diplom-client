import types from './types';

const INITIAL_STATE = {
  items: [],
  loading: false,
  totalPageCount: 1,
  currentPage: 1,
  countPerPage: 2
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
      const {campaigns, pageable} = action.data;
      return {
        ...state,
        items: campaigns,
        loading: false,
        totalPageCount: pageable.totalPageNumber,
        currentPage: pageable.page,
        countPerPage: pageable.size
      }
    }
    case types.CHANGE_PAGE_NUMBER: {
      debugger;
      return {
        ...state,
        currentPage: action.payload
      }
    }
    default:
      return state;
  }
};

export default campaignReducer;

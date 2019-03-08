import {combineReducers} from 'redux'
import campaignReducer from './app/campaign/duck/reducers';

const rootReducer = combineReducers({
  campaigns: campaignReducer
});

export default rootReducer;

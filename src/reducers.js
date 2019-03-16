import {combineReducers} from 'redux'
import campaignReducer from './app/campaign/duck/reducers';
import modalCampaignReducer from './app/campaign/duck/modal_reducers';

const rootReducer = combineReducers({
  campaigns: campaignReducer,
  modalCampaign: modalCampaignReducer
});

export default rootReducer;

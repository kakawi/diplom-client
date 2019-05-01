import {combineReducers} from 'redux'
import campaignReducer from './app/campaign/duck/reducers';
import modalCampaignReducer from './app/campaign/duck/modal_reducers';
import adSetReducer from './app/adset/duck/reducers';
import modalAdSetReducer from './app/adset/duck/modal_reducers';
import campaignConstructorReducer from './app/constructor/duck/reducers';
import metadataReducer from './app/constructor/duck/metadata_reducers';


const rootReducer = combineReducers({
  campaigns: campaignReducer,
  modalCampaign: modalCampaignReducer,
  adSets: adSetReducer,
  modalAdSet: modalAdSetReducer,
  campaignConstructors: campaignConstructorReducer,
  metadata: metadataReducer
});

export default rootReducer;

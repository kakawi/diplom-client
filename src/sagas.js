import {all} from 'redux-saga/effects';
import campaignSaga from './app/campaign/duck/sagas';
import adSetSaga from './app/adset/duck/sagas';
import watchCampaignConstructors from './app/constructor/duck/sagas';
import metadataSaga from './app/constructor/duck/metadata_sagas';


function* rootSaga() {
  yield all([
    campaignSaga(),
    adSetSaga(),
    watchCampaignConstructors(),
    metadataSaga(),
  ])
}

export default rootSaga;

import {all} from 'redux-saga/effects';
import campaignSaga from './app/campaign/duck/sagas';
import adSetSaga from './app/adset/duck/sagas';


function* rootSaga() {
  yield all([
    campaignSaga(),
    adSetSaga()
  ])
}

export default rootSaga;

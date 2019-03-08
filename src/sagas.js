import {all} from 'redux-saga/effects';
import campaignSaga from './app/campaign/duck/sagas';


function* rootSaga() {
  yield all([
    campaignSaga()
  ])
}

export default rootSaga;

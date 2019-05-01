import {put, call, all, takeEvery} from 'redux-saga/effects'
import types from './types';
import CampaignApi from './CampaignApi';

export function* requestAllCampaigns(action) {
  const data = yield call(CampaignApi.fetchAllCampaigns, action.payload);
  yield put({
    type: types.RECEIVE_ALL_CAMPAIGNS_METADATA, data
  });
}

function* watchRequestAllCampaigns() {
  yield takeEvery(types.REQUEST_ALL_CAMPAIGNS_METADATA, requestAllCampaigns);
}

function* watchMetadata() {
  yield all([
    watchRequestAllCampaigns()
  ])
}

export default watchMetadata;

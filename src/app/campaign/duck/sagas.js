import {put, call, all, takeEvery} from 'redux-saga/effects'
import types from './types';
import CampaignApi from './CampaignApi';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* requestCampaigns() {
  const data = yield call(CampaignApi.fetchAll);
  yield put({type: types.RECEIVE_CAMPAIGNS, data})
}

export function* requestOneCampaign(action) {
  const data = yield call(CampaignApi.fetchById, action.payload);
  yield put({type: types.RECEIVE_ONE_CAMPAIGN, data});
}

function* watchRequestCampaigns() {
  yield takeEvery(types.REQUEST_CAMPAIGNS, requestCampaigns);
  yield takeEvery(types.REQUEST_ONE_CAMPAIGN, requestOneCampaign);
}

function* watchCampaigns() {
  yield all([
    watchRequestCampaigns()
  ])
}

export default watchCampaigns;

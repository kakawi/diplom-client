import {put, call, all, takeEvery} from 'redux-saga/effects'
import types from './types';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* requestCampaigns() {
  const data = [
    {
      id: 1,
      name: 'Campaign1',
      impressionsHistory: [1, 2, 3],
      clicksHistory: [22, 3, 4],
      costHistory: [10, 20, 15]
    },
    {
      id: 2,
      name: 'Campaign2',
      impressionsHistory: [15, 20, 30],
      clicksHistory: [100, 300, 3],
      costHistory: [10, 0, 15]
    }
  ];
  yield call(delay, 500);
  yield put({type: types.RECEIVE_CAMPAIGNS, data})
}

function* watchRequestCampaigns() {
  yield takeEvery(types.REQUEST_CAMPAIGNS, requestCampaigns)
}

function* watchCampaigns() {
  yield all([
    watchRequestCampaigns()
  ])
}

export default watchCampaigns;

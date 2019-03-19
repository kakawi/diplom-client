import {put, call, all, takeEvery} from 'redux-saga/effects'
import types from './types';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const data = [
  {
    id: 1,
    name: 'AdSet1',
    impressionsHistory: [55, 54, 53, 52, 30, 20, 10],
    clicksHistory: [220, 3, 4],
    costHistory: [10, 8, 6, 5, 3, 2, 1],
    currentValue: 222
  },
  {
    id: 2,
    name: 'AdSet2',
    impressionsHistory: [15, 20, 30],
    clicksHistory: [100, 300, 3],
    costHistory: [10, 5, 15],
    currentValue: 222
  }
];

function* requestAdSets() {
  yield call(delay, 500);
  yield put({type: types.RECEIVE_ADSETS, data})
}

export function* requestOneAdSet(action) {
  const data = {
    id: 1,
    name: 'AdSet1',
    impressionsHistory: [55, 54, 53, 52, 30, 20, 10],
    clicksHistory: [20, 3, 4],
    costHistory: [10, 8, 6, 5, 3, 2, 1],
    currentValue: 222
  };
  yield call(delay, 500);
  yield put({type: types.RECEIVE_ONE_ADSET, data});
}

function* watchRequestAdSets() {
  yield takeEvery(types.REQUEST_ADSETS, requestAdSets);
  yield takeEvery(types.REQUEST_ONE_ADSET, requestOneAdSet);
}

function* watchAdSets() {
  yield all([
    watchRequestAdSets()
  ])
}

export default watchAdSets;

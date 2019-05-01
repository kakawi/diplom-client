import {put, call, all, takeEvery} from 'redux-saga/effects'
import types from './types';
import CampaignApi from './CampaignApi';

export function* requestConstructorCampaign(action) {
  const constructorNumber = action.payload.constructorNumber;
  const data = yield call(CampaignApi.fetchCampaignConstructor, action.payload);
  yield put({
    type: types.RECEIVE_CONSTRUCTOR_CAMPAIGN, result: {
      constructorNumber,
      data
    }
  });
}

export function* requestAllCampaignsMetadata(action) {
  const data = yield call(CampaignApi.fetchAllCampaigns, action.payload);
  yield put({
    type: types.RECEIVE_ALL_CAMPAIGNS_METADATA, result: {
      data
    }
  });
}

function* watchRequestConstructorCampaigns() {
  yield takeEvery(types.REQUEST_CONSTRUCTOR_CAMPAIGN, requestConstructorCampaign);
  yield takeEvery(types.REQUEST_ALL_CAMPAIGNS_METADATA, requestAllCampaignsMetadata);
}

function* watchCampaignConstructors() {
  yield all([
    watchRequestConstructorCampaigns()
  ])
}

export default watchCampaignConstructors;

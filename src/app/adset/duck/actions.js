import types from './types';

function requestAdSets() {
  return {
    type: types.REQUEST_ADSETS, payload: 99999
  }
}

function requestOneAdSet(id) {
  return {
    type: types.REQUEST_ONE_ADSET, payload: id
  }
}

export default {
  requestAdSets,
  requestOneAdSet
}

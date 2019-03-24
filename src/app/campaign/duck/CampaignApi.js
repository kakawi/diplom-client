import request from 'request-promise';

function fetchAll() {
  return request({
    "method": "GET",
    "uri": "http://localhost:3000/api/campaigns",
    "qs": {
      isFetchStatistic: true
    }
  }).then(result => JSON.parse(result))
}

function fetchById(id) {
  return request({
    "method": "GET",
    "uri": "http://localhost:3000/api/campaigns/" + id,
    "qs": {
      isFetchStatistic: true
    }
  }).then(result => JSON.parse(result))
}

export default {
  fetchAll,
  fetchById
}
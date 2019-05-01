import request from 'request-promise';

function fetchCampaignConstructor(
  {
    campaignId,
    periodType,
    startDate,
    endDate
  }) {
  return request({
    "method": "GET",
    "uri": "http://localhost:3000/api/campaigns/" + campaignId + "/type",
    "qs": {
      periodType,
      startDate,
      endDate,
      isFetchStatistic: true,
      isFetchProductStatistic: true
    }
  }).then(result => JSON.parse(result))
}

function fetchAllCampaigns() {
  return [
    {
      "id": 1,
      "name": "Product1_Campaign"
    },
    {
      "id": 2,
      "name": "Product2_Campaign"
    },
    {
      "id": 3,
      "name": "Product3_Campaign"
    }
  ]
}

export default {
  fetchCampaignConstructor,
  fetchAllCampaigns,
}

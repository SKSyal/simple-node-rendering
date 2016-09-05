var request = require('request'),
  Promise = require('promise');

function getDataFromEndpoint(endpoint) {
  return promise = new Promise(function(resolve, reject) {
    request.get({
      uri: endpoint,
      json: true
    }, function(error, res, body) {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function buildUrl(location) {

  var base = 'https://query.yahooapis.com/v1/public/yql',
    part1 = '?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22',
    part2 = '%22)&format=json';

  return base + part1 + location + part2;
}

function buildWeatherReport(results) {

  var data = results.query.results.channel,
    dataObj = {};

  if (data && data.location) {
    dataObj.location = data.location.city + ', ' + data.location.country;
  }

  if (data && data.item && data.item.condition) {
    dataObj.generalCondition = data.item.condition.text;
  }

  if (data && data.astronomy) {
    dataObj.daylightHours = 'between ' + data.astronomy.sunrise + ' and ' + data.astronomy.sunset;
  }

  if (data && data.item && data.item.forecast) {
    dataObj.forecast = data.item.forecast;
  }

  dataObj.sampleObj = [{
    location: 'UK',
    job: 'FE'
  },{
    location: 'India',
    job: 'BE'
  }];

  return dataObj;
}

module.exports = {
  getDataFromEndpoint: getDataFromEndpoint,
  buildUrl: buildUrl,
  buildWeatherReport: buildWeatherReport
};


var utils = require('../utils.js');

var location = function(req, res) {
    utils.getDataFromEndpoint(utils.buildUrl(req.params.location)).then(function(results) {
        res.render('master', {
            head: { title: 'Weather Page Title' },
            weather: utils.buildWeatherReport(results)
        });
    });
}

var forecast = function(req, res) {
    res.redirect('/weather/' + req.body.location);
}

module.exports = {
    location: location,
    forecast: forecast
};

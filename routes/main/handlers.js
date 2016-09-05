
var index = function(req, res) {
    res.render('master', {
        head: { title: 'Main Page Title' },
        weather: "No weather report yet"
    });
}

module.exports = {
    index: index
};

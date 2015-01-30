var dataStoreModule = require('./datastore.js');
var dataStore = new dataStoreModule();

var getViewers = function(req, res) {
  if (req.query && req.query.articleId) {
		var articleId = req.query.articleId;
		var response = dataStore.getNumViewers(articleId);
		console.log(response);
	  res.send(response);
  } else {
  	res.send('Nahi mila bhai');
  }
};


var addViewer = function(req, res) {
	var articleId = req.body.articleId;
	var viewerId = req.body.viewerId;
	res.send(dataStore.addViewer(articleId, viewerId));
};

var removeViewer = function(req, res) {
	var articleId = req.body.articleId;
	var viewerId = req.body.viewerId;
	res.send(dataStore.removeViewer(articleId, viewerId));
};

module.exports = {
  getViewers : getViewers,
  addViewer: addViewer,
  removeViewer: removeViewer
}

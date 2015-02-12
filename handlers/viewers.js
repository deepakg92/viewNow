var dataStoreModule = require('./datastore.js');
var dataStore = new dataStoreModule();

var getViewers = function(req, res) {
  if (req.query && req.query.articleId) {
		var articleId = req.query.articleId;
		var response = {
			response: dataStore.getNumViewers(articleId)
		}
		console.log(response);
	  res.send(response);
  } else {
  	var response = {
  		response: 0
  	}
  	console.log(response);
  	res.send(response);
  }
};


var addViewer = function(req, res) {
	var articleId = req.body.articleId;
	var viewerId = req.body.viewerId;
	var response = {
		response: dataStore.addViewer(articleId, viewerId)
	}
	console.log(response);
	res.send(response);
};

var removeViewer = function(req, res) {
	var articleId = req.body.articleId;
	var viewerId = req.body.viewerId;
	var response = {
		response: dataStore.removeViewer(articleId, viewerId)
	}
	res.send(response);
};

module.exports = {
  getViewers : getViewers,
  addViewer: addViewer,
  removeViewer: removeViewer
}

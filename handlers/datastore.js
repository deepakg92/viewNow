var flatMap = require('flatmap');

function ViewerDataStore() {
  this.dictionary = new Array();
  //setInterval(this.cleanUp, 600000);
}

function Viewer(viewerId, time) {
	this.viewerId = viewerId;
	this.time = time;
}

ViewerDataStore.prototype.addViewer = function(articleId, viewerId) {
  var viewer = new Viewer(viewerId, new Date().getTime());
  if (this.dictionary[articleId] === undefined) {
  	console.log("Adding a new array");
  	var listOfViewers = new Array();
  	listOfViewers[JSON.stringify(viewerId)] = viewer;
  	this.dictionary[articleId] = listOfViewers;
  	return 'Good';
  } else {
  	console.log("Adding a viewer to existing array");
  	var listOfViewers = this.dictionary[articleId];
  	listOfViewers[JSON.stringify(viewerId)] = viewer;
  	return 'Good';
  }
}

ViewerDataStore.prototype.removeViewer = function(articleId, viewerId) {
	var viewer = new Viewer(viewerId, new Date().getTime());
	var listOfViewers = this.dictionary[articleId];
  if (listOfViewers != undefined) {
  		console.log("Removing viewer from existing array");
  		var index = listOfViewers.indexOf(viewerId);
  		if (index > -1) {
  			listOfViewers.splice(index,1);
  			console.log("Removed viewer from array")
  			return 'Good';
  		}
  } else {
  	console.log("Tried to remove a viewer who was not known to be a reader");
  	return 'Bad';
  } 
}

ViewerDataStore.prototype.cleanUp = function() {
	var oldestAllowedTs = new Date().getTime() - 300000;
	flatMap(this.dictionary, function(array) {
		flatMap(array, function(viewer, i) {
			if (viewer.time < oldestAllowedTs) {
				array.splice(i,1);
				console.log("The purge - anarchy")
			}
		})
	});
}

ViewerDataStore.prototype.getNumViewers = function(articleId) {
	console.log(this.dictionary);
	console.log(articleId);
	console.log(JSON.stringify(articleId));
	if (this.dictionary[articleId] === undefined) {
		return '0';
	} else {
		return JSON.stringify(this.dictionary[articleId].length);
	}
}

module.exports = ViewerDataStore;


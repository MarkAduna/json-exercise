var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

function Get(url) {
	xhr.open('GET', url, false);
	xhr.send(null);
	return xhr.responseText;
}

const url = "http://api.viki.io/v4/videos.json?app=100250a&per_page=10&page=";

var hdTotal = 0;
var nonHDTotal = 0;
var pageNum = 0;

var loopInterval = setInterval(function () {

	var pageHDTrue = 0;
	var pageHDFalse = 0;
	pageNum++;

	var obj = JSON.parse(Get(url + pageNum));
	var response = obj.response;

	for (var i in response) {
		var hd = response[i]["flags"].hd;
		if (hd) {
			pageHDTrue++;
		} else {
			pageHDFalse++;
	    }
    }

	hdTotal += pageHDTrue;
	nonHDTotal += pageHDFalse;

	console.log("Processing page " + pageNum);

	if (obj.more === false) {
        clearInterval(loopInterval);

        console.log("\nNumber of pages processed: " + pageNum);
        console.log("HD Titles: " + hdTotal);
        console.log("Non HD Titles: " + nonHDTotal + "\n");
	}
}, 500);

// testing

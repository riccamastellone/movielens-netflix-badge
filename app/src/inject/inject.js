chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var netflix = chrome.extension.getURL("icons/netflix.png");
		var objclass = '.movie-tile-md-metadata';

		// Meh, one file less to include
		style = ".movie-tile-md-metadata-info {position:relative;}.netflix {width: 20px;position: absolute;right: 0;}";
		$('head').append('<style type="text/css">' + style + '</style>');

		// Yep, this is how it's done.
		function run() {
			var moviesLoaded = setInterval(function() {
				if ($(objclass).length > 0) {
					clearInterval(moviesLoaded);
					doRun()
				}
			},1000);
		}

		function doRun(){
		  	$(objclass).each(function(){
		  		var obj = $(this)
				$.get('https://netflixroulette.net/api/api.php?title=' + obj.find('.movie-tile-md-metadata-title a:first-child').text(),
					function(data){
						 obj.find('.movie-tile-md-metadata-info').prepend('<img class="netflix" src="' + netflix + '">');
					},'json')
			})
		}

		// We catch the message from the background.js
		// (atm only means page changes) and we call run()
		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
		    	run();
			}
		);

		run();
	}
	}, 10);
});
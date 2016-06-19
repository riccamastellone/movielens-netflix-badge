chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var netflix = chrome.extension.getURL("icons/netflix.png");

		// Meh, one file less to include
		style = ".movie-tile-md-metadata-info {position:relative;}.netflix {width: 20px;position: absolute;right: 0;}";
		$('head').append('<style type="text/css">' + style + '</style>');

		// Yep, this is how it's done.
		// As soon as I undestand how to detect Angular completion event
		// I'll make it better
		setTimeout(run, 3000);
		function run(){
		  	$('.movie-tile-md-metadata').each(function(){
		  		var obj = $(this)
				$.get('https://netflixroulette.net/api/api.php?title=' + obj.find('.movie-tile-md-metadata-title a:first-child').text(),
					function(data){
						 obj.find('.movie-tile-md-metadata-info').prepend('<img class="netflix" src="' + netflix + '">');
					},'json')
			})
		}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
  });


	}
	}, 10);
});
// MovieLens uses Angular and pushHistory when changing page.
// We use this listener to detect it and warn the inject.js script
chrome.webNavigation.onHistoryStateUpdated.addListener(function(object){
    chrome.tabs.sendMessage(object.tabId, {event: 'page_changed'}, function(response) {
    	// We don't really care about the callback
    });
});
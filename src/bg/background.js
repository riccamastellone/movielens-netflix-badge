chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {event: "page_change"}, function(response) {
    console.log(response);
  });
});
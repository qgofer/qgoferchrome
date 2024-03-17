// background.js

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'openNewWindow') {
    chrome.windows.create({
      url: 'new_window.html',
      type: 'popup',
      width: 350,
      height: 500,
      top: 60
    });
  }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.clicked == "createLinks"){
        executeContent(request.tabID, request.choices)
        sendResponse({message: "ok"});
      }
      else if (request.clicked == "restorePage"){
        // basically a refresh, not sure how to just backup and restore the DOM so that it's faster, help
        chrome.tabs.executeScript(request.tabID, {
          code: "location.reload()"
        });
        sendResponse({message: "ok"});
      }
  });


function executeContent (tabID, choiceArray) {
  chrome.tabs.executeScript(tabID, {
    code: "var choiceArray = [" + choiceArray.toString() + "]"
  }, function() {
    chrome.tabs.executeScript(tabID, {file: "content_script.js"});
  });
}

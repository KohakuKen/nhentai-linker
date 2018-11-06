let createLinks = document.getElementById('createLinks');
let restorePage = document.getElementById('restorePage');

createLinks.onclick = function(element) {
    let checkboxes = document.getElementsByName('digits');
    let values = []

    for (let i = 0; i < 6; i++){
        if (checkboxes[i].checked){
            values.push(checkboxes[i].value)
        }
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({tabID: tabs[0].id, clicked: "createLinks", choices: values}, function(response) {
          console.log(response.message);
        });
    });
};

restorePage.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({tabID: tabs[0].id, clicked: "restorePage"}, function(response) {
          console.log(response.message);
        });
    });
};
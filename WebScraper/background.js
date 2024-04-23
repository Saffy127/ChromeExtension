// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "executeScript") {
        chrome.scripting.executeScript({
            target: {tabId: request.tabId},
            files: ['content.js']
        }).then(() => {
            sendResponse({status: "Script executed"});
        }).catch(error => {
            sendResponse({status: "Execution failed", error: error});
        });
    }
    return true; // Keep the message channel open for the response
});

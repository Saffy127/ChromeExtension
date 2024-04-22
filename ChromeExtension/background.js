chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "setColor",
        title: "Set Background Color",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "setColor") {
        chrome.storage.sync.get('favoriteColor', function(data) {
            if (data.favoriteColor) {
                chrome.tabs.sendMessage(tab.id, {color: data.favoriteColor});
            }
        });
    }
});










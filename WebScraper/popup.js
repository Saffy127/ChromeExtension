document.getElementById('scrapeData').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'data') {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '<h2>Scraped Links:</h2>';
        message.links.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.textContent = link;
            outputDiv.appendChild(linkElement);
        });
    }
});

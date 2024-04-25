document.getElementById('scrapeData').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length === 0) {
            console.error("No active tab found.");
            return;
        }
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        }).then((injectionResults) => {
            injectionResults.forEach((frameResult) => {
                console.log('Frame Title: ' + frameResult.result);
            });
        }).catch((error) => {
            console.error('Script execution failed:', error);
        });
    });
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'data') {
        const outputDiv = document.getElementById('output');
        const filterKeyword = document.getElementById('filterInput').value.toLowerCase();
        outputDiv.innerHTML = '<h2>Filtered Links:</h2>';

        // Filter links based on the keyword
        const filteredLinks = message.links.filter(link => link.toLowerCase().includes(filterKeyword));
        filteredLinks.forEach(link => {
            const linkElement = document.createElement('div');
            linkElement.textContent = link;
            outputDiv.appendChild(linkElement);
        });
    }
});
document.getElementById('saveData').addEventListener('click', function() {
    const outputDiv = document.getElementById('output');
    const links = Array.from(outputDiv.querySelectorAll('div')).map(div => div.textContent);
    localStorage.setItem('savedLinks', JSON.stringify(links));
    alert('Data saved locally!');
});


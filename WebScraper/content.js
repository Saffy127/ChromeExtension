const data = [];
const elements = document.getElementsByTagName('a');  // Example: Grabbing all links
for (let element of elements) {
    data.push(element.href);  // Collect each link's href attribute
}

// Send data to popup script
chrome.runtime.sendMessage({type: 'data', links: data});

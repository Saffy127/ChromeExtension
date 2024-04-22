document.addEventListener('DOMContentLoaded', function () {
    var changeColorButton = document.getElementById('changeColor');
    var colorPicker = document.getElementById('colorPicker');

    // Function to change the background color
    function changeBackgroundColor(color) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            if (currentTab) {  // Check if the current tab is defined
                chrome.tabs.sendMessage(currentTab.id, {color: color});
            }
        });
    }

    // Load saved color from Chrome's storage
    chrome.storage.sync.get('favoriteColor', function(data) {
        if (data.favoriteColor) {
            colorPicker.value = data.favoriteColor; // Set the color picker's value
            changeBackgroundColor(data.favoriteColor); // Change background color on load
        }
    });

    // Save the color and change the background when the button is clicked
    changeColorButton.onclick = function() {
        var color = colorPicker.value;
        chrome.storage.sync.set({'favoriteColor': color}, function() {
            changeBackgroundColor(color);
        });
    };
});

Let  messageText = document.getElementById("message");
Let actionButton = document.getElementById("actionBtn");

// Add an event listener to run code whenever the user clicks the button
actionButton.addEventListener("click", function() {
    // Change the text content inside the paragraph tag
    messageText.innerHTML = "✨ Thanks for visiting! You just ran your first script successfully! ✨";
    messageText.style.color = "#0a387ebc";
    
    // Create a temporary pop-up message box in the browser window
    alert("Hello! Thanks for interacting with my website!");
});
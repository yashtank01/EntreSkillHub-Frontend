// Function 1: Handles bookmarking a business idea on the Dashboard
function saveIdea(buttonElement) {
    // Change the text from "Bookmark" to "Saved!"
    buttonElement.innerText = "Saved!";
    
    // Add the "saved" class so CSS knows to turn it green
    buttonElement.classList.add("saved");
    
    // Disable the button so the user cannot click it 100 times
    buttonElement.disabled = true;
    
    // Log a message to the hidden developer console
    console.log("Business idea saved to user profile.");
}

// Function 2: Handles booking a mentor on the Mentor Directory
function requestMentor(buttonElement) {
    // Change the text
    buttonElement.innerText = "Request Sent!";
    
    // Instead of using CSS, here is how you change styling directly with JS
    buttonElement.style.backgroundColor = "#10b981"; // Green
    buttonElement.style.color = "white";
    
    // Disable the button
    buttonElement.disabled = true;
    
    // Trigger a pop-up alert on the user's screen
    alert("Success! The mentor has been notified and will contact you shortly.");
}
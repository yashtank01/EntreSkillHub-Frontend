// ==========================================
// 4. mentors.js (Mentor Finding & Management)
// ==========================================

// --- MENTEE SIDE: SEARCH & REQUEST MENTOR ---
// (Placeholder for Search/Filter logic when you add the UI)
// function filterMentors(query) { ... }

async function requestMentor(buttonElement, mentorName) {
    buttonElement.innerText = "Sending Request...";
    buttonElement.disabled = true;

    try {
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/request-mentor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mentor: mentorName }) 
        });

       if (response.ok) {
            buttonElement.innerText = "Request Sent!";
            buttonElement.style.backgroundColor = "#10b981"; 
            buttonElement.style.color = "white";
            showNotification(`🎉 Success! ${mentorName} has been notified and will contact you shortly.`, true);
        } else {
            buttonElement.innerText = "Request Session";
            buttonElement.disabled = false;
            showNotification("❌ The server rejected the request. Check your terminal!", false);
        }
    } catch (error) {
        console.error('Error connecting to backend:', error);
    }
}

// --- MENTOR SIDE: CONTROL PANEL ---
async function handleRequest(cardId, action) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const studentName = card.querySelector('h4').innerText;

    try {
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/manage-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: action, studentName: studentName })
        });
        if (response.ok) {
            if (action === 'accepted') {
                showNotification('✅ Student accepted! They will be notified.', true);
                card.style.borderLeftColor = '#10b981';
                card.innerHTML = `<h4>Mentorship Active</h4><p>You can now message ${studentName} directly from your portal.</p>`;
            } else {
                showNotification('ℹ️ Mentee request declined.', false);
                card.style.display = 'none'; 
            }
        }
    } catch (error) {
        showNotification('❌ Server error.', false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById('upload-resource-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const inputs = uploadForm.querySelectorAll('input, select');
            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/upload-resource', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: inputs[0].value, category: inputs[1].value, url: inputs[2].value })
                });
                if (response.ok) {
                    showNotification('🎉 Resource successfully published to students!', true);
                    uploadForm.reset();
                }
            } catch (error) {
                showNotification('❌ Failed to upload resource to server.', false);
            }
        });
    }
});
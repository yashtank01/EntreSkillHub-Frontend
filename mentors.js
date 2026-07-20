// ==========================================
// 4. mentor.js (REAL DATABASE / BACKEND VERSION)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 🚀 WAKE UP RENDER BACKEND
    fetch('https://entireskillhub-backend.onrender.com/').catch(()=>console.log("Backend waking up..."));

    // --- 1. UPLOAD CONTENT TO DATABASE ---
    const uploadForm = document.getElementById('upload-content-form');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const submitBtn = uploadForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Uploading to Database...";
            submitBtn.disabled = true;

            const title = document.getElementById('content-title').value;
            const category = document.getElementById('content-category').value;
            const url = document.getElementById('content-body').value;
            const type = document.getElementById('content-type').value; 
            const mentorEmail = localStorage.getItem("userEmail") || "mentor@demo.com";

            try {
                // REAL BACKEND API CALL
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/upload-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        title: title, 
                        category: category, 
                        url: url, 
                        type: type,
                        uploadedBy: mentorEmail
                    })
                });

                if (response.ok) {
                    if (typeof showNotification === "function") {
                        showNotification("✅ Content uploaded successfully! Waiting for Admin approval.", true);
                    }
                    uploadForm.reset(); 
                } else {
                    if (typeof showNotification === "function") showNotification("❌ Failed to upload content.", false);
                }
            } catch (error) {
                console.error('Error uploading to DB:', error);
                if (typeof showNotification === "function") showNotification("❌ Database connection error.", false);
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// --- 2. ACCEPT/DECLINE STUDENT REQUESTS (SYNCED WITH DB) ---
window.handleRequest = async function(cardId, action) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    const studentName = card.querySelector('h3') ? card.querySelector('h3').innerText : 'Student';
    const mentorEmail = localStorage.getItem("userEmail") || "mentor@demo.com";

    // Update UI Optimistically
    if (action === 'accepted') {
        if (typeof showNotification === "function") showNotification('✅ Saving acceptance to DB...', true);
        card.style.borderLeftColor = '#10b981';
        card.innerHTML = `
            <h3 style="color: #10b981;">Mentorship Active</h3>
            <p>You are now mentoring <strong>${studentName}</strong>.</p>
            <button class="btn btn-outline" style="margin-top: 10px;" onclick="openChat('${studentName}')">💬 Chat with Mentee</button>
        `;
    } else {
        if (typeof showNotification === "function") showNotification('ℹ️ Request declined.', false);
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
    }

    // SEND TO BACKEND DATABASE
    try {
        await fetch('https://entireskillhub-backend.onrender.com/api/manage-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: action, studentName: studentName, mentorEmail: mentorEmail })
        });
    } catch (error) {
        console.error('Backend sync failed:', error);
    }
};

// --- 3. CHAT DEMO FUNCTION ---
window.openChat = function(studentName) {
    alert(`💬 Chat with ${studentName} is currently in Development (Beta Mode).\n\nThis feature will be available in the next release!`);
};
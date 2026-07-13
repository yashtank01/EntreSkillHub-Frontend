// ==========================================
// 3. dashboard.js (Dashboard Content & Bookmarks)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // --- DASHBOARD USER NAME LOGIC ---
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');
    if (userName) {
        const welcomeHeading = document.getElementById('welcome-message');
        if (welcomeHeading) {
            welcomeHeading.innerText = `Welcome back, ${userName}! 👋`;
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // --- PROFILING FORM LOGIC ---
    const profilingForm = document.getElementById('profiling-form');
    if (profilingForm) {
        profilingForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const selectedSkills = [];
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach((box) => { selectedSkills.push(box.value); });

            if (selectedSkills.length === 0) {
                showNotification("⚠️ Please select at least one skill to continue!", false);
                return; 
            }
            showNotification("✅ Skills saved! Matching you with roadmaps...", true);
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
        });
    }
});

// --- SAVE IDEA LOGIC ---
async function saveIdeaToDB(ideaName) {
    try {
        const response = await fetch('http://localhost:5000/api/save-idea', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idea: ideaName })
        });
        const data = await response.json();

        if (response.ok) {
            showNotification(`✅ Successfully bookmarked: ${ideaName}`, true);
        } else {
            showNotification(`❌ Error: ${data.error}`, false);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        showNotification("⚠️ Could not connect to the database.", false);
    }
}
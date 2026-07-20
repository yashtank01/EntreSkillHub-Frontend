// ==========================================
// 1. global.js (Loaded on EVERY page)
// ==========================================

// Apply theme immediately to prevent white flashing
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// ==========================================
// INITIALIZATION ON PAGE LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- UPLOAD CONTENT LOGIC (For Mentor/Admin Dashboard) ---
    const uploadForm = document.getElementById('upload-content-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const title = document.getElementById('content-title').value;
            const type = document.getElementById('content-type').value;
            const category = document.getElementById('content-category').value;
            const bodyOrLink = document.getElementById('content-body').value;
            const authorName = "Platform Mentor/Admin"; 

            try {
                const response = await fetch('https://entireskillhub-backend.onrender.com/api/upload-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, type, category, bodyOrLink, authorName })
                });

                const data = await response.json();

                if (response.ok) {
                    if (typeof showNotification === 'function') {
                        showNotification('✅ ' + data.message, true);
                    } else {
                        alert('✅ ' + data.message);
                    }
                    uploadForm.reset(); 
                } else {
                    alert('❌ Error: ' + (data.error || "Could not upload content."));
                }
            } catch (error) {
                console.error("Upload Error:", error);
                alert('❌ Could not connect to the server.');
            }
        });
    }

    // --- SKILL PROFILING LOGIC (For profiling.html) ---
    const profilingForm = document.getElementById('profiling-form');
    if (profilingForm) {
        profilingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Gather ALL selected skills into an array (because we are using checkboxes)
            const selectedSkills = [];
            const checkboxes = document.querySelectorAll('input[name="skills"]:checked');
            
            checkboxes.forEach((box) => {
                selectedSkills.push(box.value);
            });

            // 2. Stop them if they didn't pick anything
            if (selectedSkills.length === 0) {
                alert("Please select at least one skill to continue!");
                return;
            }

            // 3. Save the array of skills to local memory
            localStorage.setItem("userSkills", JSON.stringify(selectedSkills));

            // 4. Send them to the dashboard
            window.location.href = "dashboard.html";
        });
    }

    // --- TRIGGER STUDENT DASHBOARD LOAD ---
    // This will only run if it finds the 'student-content-feed' element on the page
    loadStudentContent();
});


// ==========================================
// GLOBAL FUNCTIONS
// ==========================================

// --- NOTIFICATION SYSTEM ---
function showNotification(message, isSuccess) {
    const toast = document.getElementById('toast-message');
    if (!toast) return; 
    
    toast.innerText = message;
    toast.className = isSuccess ? 'toast success' : 'toast error';
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}


// --- LOAD & FILTER CONTENT FOR STUDENTS ---
async function loadStudentContent() {
    const feed = document.getElementById('student-content-feed');
    if (!feed) return; // Stop here if we aren't on the student dashboard

    try {
        // 1. Fetch ALL content from the backend database
        const response = await fetch('https://entireskillhub-backend.onrender.com/api/content');
        const allContents = await response.json();

        // 2. Read the user's selected skills from memory
        const savedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");

        // 3. Filter the content so it only shows items matching their selected skills
        let contentsToDisplay = allContents;
        
        if (savedSkills.length > 0) {
            contentsToDisplay = allContents.filter(item => savedSkills.includes(item.category));
        }

        // Clear the "Loading..." text
        feed.innerHTML = ''; 

        if (contentsToDisplay.length === 0) {
            feed.innerHTML = '<p>No training content available for your selected skills yet. Check back later!</p>';
            return;
        }

        // 4. Loop through the FILTERED content and draw the cards
        contentsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.className = 'content-card';
            
            // --- Bulletproof Link Checker ---
            let safeLink = item.bodyOrLink;
            if (item.type === 'video' && !safeLink.startsWith('http')) {
                safeLink = 'https://' + safeLink; 
            }
            // --------------------------------

            let mediaHtml = '';
            if (item.type === 'video') {
                mediaHtml = `<a href="${safeLink}" target="_blank" class="watch-btn">▶ Watch Video</a>`;
            } else {
                mediaHtml = `<p class="article-preview">${item.bodyOrLink.substring(0, 80)}...</p>
                             <a href="#" class="read-btn">Read Full Article</a>`;
            }

            card.innerHTML = `
                <div class="card-badge">${item.category}</div>
                <h4>${item.title}</h4>
                <p class="author-text">By ${item.authorName}</p>
                ${mediaHtml}
            `;
            feed.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load content:", error);
        feed.innerHTML = '<p>❌ Error loading content. Please try again later.</p>';
    }
}

